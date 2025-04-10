import { useEffect, useRef, useState } from 'react';
import { useEmissionsImport } from '../hooks/useEmissionsImport';
import { Company } from '../../../shared/types/db-models';

export const EmissionsImport = () => {
  const {
    companies,
    selectedCompany,
    loading,
    error,
    success,
    loadCompanies,
    setSelectedCompany,
    handleFileUpload
  } = useEmissionsImport();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showExample, setShowExample] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const downloadExample = () => {
    const exampleContent = 'volume,frequency,dischargePoint,reductionTarget,pollutionType,date\n100,Daily,North Beach,Reduce 20%,Plastic,2023-01-15\n200,Weekly,South Beach,Reduce 30%,Oil Spill,2023-02-20\n150,Monthly,East Beach,Reduce 10%,Chemical,2023-03-25';
    
    const blob = new Blob([exampleContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emissions_example.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Import Emissions</h2>
      
      <div>
        <label>
          Select Company
        </label>
        <select
          value={selectedCompany?.id || ''}
          onChange={(e) => {
            const company = companies.find((c: Company) => c.id === Number(e.target.value));
            setSelectedCompany(company || null);
          }}
        >
          <option value="">Select a company</option>
          {companies.map((company: Company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          Emissions File
        </label>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".csv,.txt,.xlsx,.xls"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </button>
          {selectedFile && (
            <span>
              {selectedFile.name}
            </span>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={handleImport}
          disabled={loading || !selectedCompany || !selectedFile}
        >
          {loading ? 'Processing...' : 'Import Data'}
        </button>
      </div>

      {error && (
        <div>
          {error}
        </div>
      )}

      {success && (
        <div>
          {success}
        </div>
      )}

      <div>
        <p>Supported formats: CSV, TXT, Excel (.xlsx, .xls)</p>
        <p>The file must contain the following columns:</p>
        <ul>
          <li>volume (number)</li>
          <li>frequency (text)</li>
          <li>dischargePoint (text)</li>
          <li>reductionTarget (text)</li>
          <li>pollutionType (must be: Plastic, Oil Spill, Chemical)</li>
          <li>date (date)</li>
        </ul>
        
        <div>
          <button 
            onClick={() => setShowExample(!showExample)}
          >
            {showExample ? 'Hide example' : 'Show format example'}
          </button>
          
          {showExample && (
            <div>
              <p>CSV file example:</p>
              <pre>
                volume,frequency,dischargePoint,reductionTarget,pollutionType,date
                100,Daily,North Beach,Reduce 20%,Plastic,2023-01-15
                200,Weekly,South Beach,Reduce 30%,Oil Spill,2023-02-20
                150,Monthly,East Beach,Reduce 10%,Chemical,2023-03-25
              </pre>
              <button 
                onClick={downloadExample}
              >
                Download example
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 