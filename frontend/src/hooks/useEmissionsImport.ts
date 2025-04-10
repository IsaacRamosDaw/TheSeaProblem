import { useState } from 'react';
import { Company, Emission, PollutionType } from '../../../shared/types/db-models';
import { getAllCompanies } from '../services/companys';
import { createEmission } from '../services/emissions';
import * as XLSX from 'xlsx';

export const useEmissionsImport = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCompanies = async () => {
    try {
      const companiesData = await getAllCompanies(new Headers());
      setCompanies(companiesData);
    } catch (err) {
      setError('Error loading companies');
      console.error(err);
    }
  };

  const validatePollutionType = (type: string): PollutionType | null => {
    const validTypes = ["Plastic", "Oil Spill", "Chemical"];
    if (validTypes.includes(type)) {
      return type as PollutionType;
    }
    return null;
  };

  const parseCSV = (text: string): Emission[] => {
    console.log('Parsing CSV file');
    const lines = text.split('\n');
    
    if (lines.length < 2) {
      throw new Error('The file must contain at least one header line and one data line');
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Check that required headers are present
    const requiredHeaders = ['volume', 'frequency', 'dischargePoint', 'reductionTarget', 'pollutionType', 'date'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    const dataLines = lines.slice(1).filter(line => line.trim());
    
    if (dataLines.length === 0) {
      throw new Error('The file contains no data. It must have at least one data line after the headers.');
    }
    
    return dataLines.map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        throw new Error(`Error in line ${index + 2}: number of values (${values.length}) does not match number of headers (${headers.length})`);
      }
      
      const emission: any = {};
      
      headers.forEach((header, index) => {
        if (header === 'volume') {
          const volume = Number(values[index]);
          if (isNaN(volume) || volume <= 0) {
            throw new Error(`Error in line ${index + 2}: 'volume' value must be a positive number`);
          }
          emission[header] = volume;
        } else if (header === 'date') {
          const date = new Date(values[index]);
          if (isNaN(date.getTime())) {
            throw new Error(`Error in line ${index + 2}: 'date' value must be a valid date`);
          }
          emission[header] = date.toISOString();
        } else if (header === 'pollutionType') {
          const validType = validatePollutionType(values[index]);
          if (!validType) {
            throw new Error(`Error in line ${index + 2}: invalid pollution type: ${values[index]}. Must be one of: Plastic, Oil Spill, Chemical`);
          }
          emission[header] = validType;
        } else {
          if (!values[index]) {
            throw new Error(`Error in line ${index + 2}: '${header}' value cannot be empty`);
          }
          emission[header] = values[index];
        }
      });

      if (selectedCompany) {
        emission.companyId = selectedCompany.id;
      }

      return emission;
    });
  };

  const parseExcel = (file: File): Promise<Emission[]> => {
    console.log('Parsing Excel file');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          
          if (json.length === 0) {
            throw new Error('The Excel file contains no data');
          }
          
          // Check that required headers are present
          const firstRow = json[0] as any;
          const requiredHeaders = ['volume', 'frequency', 'dischargePoint', 'reductionTarget', 'pollutionType', 'date'];
          const missingHeaders = requiredHeaders.filter(h => !(h in firstRow));
          
          if (missingHeaders.length > 0) {
            throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
          }
          
          const emissions = json.map((row: any, index) => {
            const pollutionType = validatePollutionType(row.pollutionType);
            if (!pollutionType) {
              throw new Error(`Error in row ${index + 2}: invalid pollution type: ${row.pollutionType}. Must be one of: Plastic, Oil Spill, Chemical`);
            }
            
            const volume = Number(row.volume);
            if (isNaN(volume) || volume <= 0) {
              throw new Error(`Error in row ${index + 2}: 'volume' value must be a positive number`);
            }
            
            const date = new Date(row.date);
            if (isNaN(date.getTime())) {
              throw new Error(`Error in row ${index + 2}: 'date' value must be a valid date`);
            }
            
            return {
              ...row,
              volume,
              date: date.toISOString(),
              companyId: selectedCompany?.id,
              pollutionType
            };
          });
          
          resolve(emissions);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsBinaryString(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    console.log('handleFileUpload called with file:', file.name);
    
    if (!selectedCompany) {
      setError('Please select a company first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let emissions: Emission[] = [];

      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        console.log('Processing CSV/TXT file');
        const text = await file.text();
        emissions = parseCSV(text);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        console.log('Processing Excel file');
        emissions = await parseExcel(file);
      } else {
        throw new Error('Unsupported file format');
      }

      console.log('Parsed emissions:', emissions);

      if (emissions.length === 0) {
        throw new Error('No valid data found in the file');
      }

      // Create the emissions
      let successCount = 0;
      let errorCount = 0;
      
      for (const emission of emissions) {
        console.log('Creating emission:', emission);
        try {
          const result = await createEmission(emission);
          if (result) {
            successCount++;
            console.log('Emission created:', result);
          } else {
            errorCount++;
            console.error('Failed to create emission');
          }
        } catch (err) {
          errorCount++;
          console.error('Error creating emission:', err);
        }
      }

      if (successCount > 0) {
        setSuccess(`${successCount} emissions imported successfully.`);
      }
      
      if (errorCount > 0) {
        setError(`Could not import ${errorCount} emissions.`);
      } else if (successCount === 0) {
        setError('Could not import any emissions. Please check the data format.');
      }
      
    } catch (err: any) {
      console.error('Error during import:', err);
      setError(err.message || 'Error processing the file');
    } finally {
      setLoading(false);
    }
  };

  return {
    companies,
    selectedCompany,
    loading,
    error,
    success,
    loadCompanies,
    setSelectedCompany,
    handleFileUpload
  };
}; 