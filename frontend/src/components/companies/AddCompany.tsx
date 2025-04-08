import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyStyles.scss';
import InspirationSection from '../common/InspirationSection';
import useCompanyForm from '../../hooks/useCompanyForm';

const AddCompany: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    error,
    isEditMode,
    isAuthenticated,
    handleChange,
    handleSubmit
  } = useCompanyForm();

  if (!isAuthenticated) {
    return (
      <div className="auth-required-message">
        You must be logged in to {isEditMode ? 'edit' : 'add'} a company.
      </div>
    );
  }

  if (loading) {
    return <div className="loading-container">Loading company data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-container">
      <InspirationSection />
      <h1 className="form-title">{isEditMode ? 'Edit Company' : 'Add New Company'}</h1>
      <form onSubmit={handleSubmit} className="company-form">
        <fieldset className="form-fieldset">
          <legend>General Company Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Ex: XYZ Company Ltd."
              />
            </div>
            <div className="form-group">
              <label htmlFor="taxId">Tax ID</label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                required
                placeholder="Ex: B12345678"
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Ex: 123 Main Street, 28001 Madrid"
            />
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Description of Activities</legend>
          <div className="form-group">
            <label htmlFor="industrialSector">Industrial Sector</label>
            <input
              type="text"
              id="industrialSector"
              name="industrialSector"
              value={formData.industrialSector}
              onChange={handleChange}
              required
              placeholder="Ex: Technology, Manufacturing, Services"
            />
          </div>
          <div className="form-group">
            <label htmlFor="relatedActivitiesDescription">Related Activities Description</label>
            <textarea
              id="relatedActivitiesDescription"
              name="relatedActivitiesDescription"
              value={formData.relatedActivitiesDescription}
              onChange={handleChange}
              required
              placeholder="Describe the main activities of the company..."
              rows={4}
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Company' : 'Create Company'}
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/companies')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;