import React, { useEffect, useState } from 'react';
import { getAllCompanies, deleteCompanyById } from '../../services/companys';
import { useNavigate } from 'react-router-dom';
import type { Company } from '@/shared/types/db-models';
import ConfirmModal from '../common/ConfirmModal';
import './CompanyStyles.scss';
import InspirationSection from '../common/InspirationSection';
import { useUser } from '../../hooks/useUser';

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const { user} = useUser();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading companies. Please try again.');
        setLoading(false);
        console.error('Error loading companies:', err);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on the logged-in user's ID
  const filteredCompanies = user 
    ? companies.filter(company => company.userId === user?.id)
    : [];

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!companyToDelete || !companyToDelete.id) return;

    setDeletingId(companyToDelete.id);
    try {
      await deleteCompanyById(companyToDelete.id.toString());
      setCompanies(companies.filter(c => c.id !== companyToDelete.id));
    } catch (err) {
      setError('Error al eliminar la empresa');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCompanyToDelete(null);
  };

  if (loading) {
    return <div className="loading-container">Loading companies...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return (
      <div className="auth-required-message">
        You must be logged in to view your companies.
      </div>
    );
  }

  return (
    <div className="companies-container">
      <InspirationSection />
      <div className="companies-header">
        <h1 className="form-title">My Companies</h1>
        <button 
          className="add-button"
          onClick={() => navigate('/companies/add')}
        >
          Add Company
        </button>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="no-companies">
          You don't have any registered companies. Click "Add Company" to create a new one.
        </div>
      ) : (
        <div className="companies-table-container">
          <table className="companies-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tax ID</th>
                <th>Address</th>
                <th>Industrial Sector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.companyName}</td>
                  <td>{company.taxId}</td>
                  <td>{company.address}</td>
                  <td>{company.industrialSector}</td>
                  <td className="actions-cell">
                    <button 
                      className="view-button"
                      onClick={() => navigate(`/companies/${company.id}`)}
                    >
                      View
                    </button>
                    <button 
                      className="edit-button"
                      onClick={() => navigate(`/companies/${company.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(company)}
                      disabled={deletingId === company.id}
                    >
                      {deletingId === company.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Eliminar Empresa"
        message={`¿Estás seguro de que deseas eliminar la empresa "${companyToDelete?.companyName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default CompanyList; 