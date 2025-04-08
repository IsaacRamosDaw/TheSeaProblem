import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../services/companys';
import { useAuth } from '../../context/AuthContext';
import { Company, User } from '@/shared/types/db-models';
import './CompanyStyles.scss';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getCompanyById(id);
        setCompany(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading company details. Please try again.');
        setLoading(false);
        console.error('Error loading company details:', err);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading company details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!company) {
    return <div className="error-message">Company not found</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required-message">
        You must be logged in to view company details.
      </div>
    );
  }

  return (
    <div className="company-detail-container">
      <div className="company-detail-header">
        <h1 className="company-detail-title">Company Information</h1>
        <button 
          className="back-button"
          onClick={() => navigate('/companies')}
        >
          Back to Companies
        </button>
      </div>

      <div className="company-detail-section">
        <div className="company-info-item">
          <h3>Company name</h3>
          <p>{company.companyName}</p>
        </div>
        <div className="company-info-item">
          <h3>Tax Identification Number</h3>
          <p>{company.taxId}</p>
        </div>
        <div className="company-info-item">
          <h3>Address & Location</h3>
          <p>{company.address}</p>
        </div>
        <div className="company-info-item">
          <h3>Contact Person & Communication Details</h3>
          <p>Name: {user && user.name ? `${user.name} ${user.lastname || ''}` : 'N/A'}</p>
          <p>Email: {user?.email || 'N/A'}</p>
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="company-detail-section">
        <h2 className="section-title">Operational Profile</h2>
        <div className="company-info-item">
          <h3>Industry Sector</h3>
          <p>{company.industrialSector}</p>
        </div>
        <div className="company-info-item">
          <h3>Description of Marine-Related Activities</h3>
          <p>{company.relatedActivitiesDescription}</p>
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="company-detail-section">
        <h2 className="section-title">Emissions and Discharge Data</h2>
        <div className="under-construction">
          <p>This section is under construction. Data will be loaded from another table.</p>
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="company-detail-section">
        <h2 className="section-title">Line Chart for Monthly Solvent Emissions</h2>
        <div className="under-construction">
          <p>This section is under construction. A chart will be rendered with company-provided data.</p>
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="company-detail-section">
        <h2 className="section-title">Blue Seal of Transparency</h2>
        <p className="blue-seal-text">
          Earn the Blue Seal of Transparency and demonstrate your commitment to reducing marine pollution. 
          By participating in this initiative, your company contributes to a healthier ocean and gains recognition 
          for its sustainable efforts. Transparency and accountability are key to making a real difference—join us 
          and become a leader in environmental responsibility!
        </p>
        <div className="blue-seal-image-container">
          <img 
            src="/BlueSealOfTransparency2.png" 
            alt="Blue Seal of Transparency" 
            className="blue-seal-image"
          />
        </div>
        
        <div className="export-seal-section">
          <h3>Export Blue Seal to Your Website</h3>
          <p>Share your commitment to marine conservation by displaying the Blue Seal on your website.</p>
          
          <div className="export-options">
            <div className="export-option">
              <h4>HTML Code</h4>
              <div className="code-container">
                <code>{`<a href="https://thesea.org/companies/${company.id}" target="_blank" rel="noopener noreferrer">
  <img src="https://thesea.org/BlueSealOfTransparency2.png" alt="Blue Seal of Transparency" width="200" />
</a>`}</code>
              </div>
              <button 
                className="copy-button"
                onClick={() => {
                  const code = `<a href="https://thesea.org/companies/${company.id}" target="_blank" rel="noopener noreferrer">
  <img src="https://thesea.org/BlueSealOfTransparency2.png" alt="Blue Seal of Transparency" width="200" />
</a>`;
                  navigator.clipboard.writeText(code);
                  alert('HTML code copied to clipboard!');
                }}
              >
                Copy HTML Code
              </button>
            </div>
            
            <div className="export-option">
              <h4>Direct Link</h4>
              <div className="code-container">
                <code>https://thesea.org/companies/{company.id}</code>
              </div>
              <button 
                className="copy-button"
                onClick={() => {
                  const link = `https://thesea.org/companies/${company.id}`;
                  navigator.clipboard.writeText(link);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail; 