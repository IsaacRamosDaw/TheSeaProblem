import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCompany, getCompanyById, updateCompanyById } from '../services/companys';
import { useAuth } from '../context/AuthContext';

const useCompanyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: '',
    taxId: '',
    address: '',
    industrialSector: '',
    relatedActivitiesDescription: '',
    userId: user?.id || 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const companyData = await getCompanyById(id!);
          setFormData({
            companyName: companyData.companyName,
            taxId: companyData.taxId,
            address: companyData.address,
            industrialSector: companyData.industrialSector,
            relatedActivitiesDescription: companyData.relatedActivitiesDescription,
            userId: companyData.userId
          });
        } catch (err) {
          console.error('Error fetching company data:', err);
          setError('Error loading company data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompanyData();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFormData = () => {
    const requiredFields = [
      'companyName',
      'taxId',
      'address',
      'industrialSector',
      'relatedActivitiesDescription'
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (!user?.id) {
      throw new Error('User ID is required');
    }

    // Asegurarnos de que los datos estén en el formato correcto
    const formattedData = {
      companyName: formData.companyName.trim(),
      taxId: formData.taxId.trim(),
      address: formData.address.trim(),
      industrialSector: formData.industrialSector.trim(),
      relatedActivitiesDescription: formData.relatedActivitiesDescription.trim(),
      userId: Number(user.id) // Asegurarnos de que userId sea un número
    };

    return formattedData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const validatedData = validateFormData();

      if (isEditMode) {
        await updateCompanyById(id!, validatedData);
      } else {
        await createCompany(validatedData);
      }
      navigate('/companies');
    } catch (err) {
      console.error('Error saving company:', err);
      setError(err instanceof Error ? err.message : 'Error saving company data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    isEditMode,
    isAuthenticated,
    handleChange,
    handleSubmit
  };
};

export default useCompanyForm;