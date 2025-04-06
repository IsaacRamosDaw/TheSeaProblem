import React from 'react';
import './InspirationSection.scss';

const InspirationSection: React.FC = () => {
  return (
    <div className="inspiration-section">
      <h1 className="main-title">Marine Impact Reporting</h1>
      <h2 className="subtitle">Empowering Transparency, Inspiring Change</h2>
      
      <div className="image-container">
        <img 
          src="/lake-6856288_11zon.jpg" 
          alt="Marine Impact" 
          className="inspiration-image"
        />
        <div className="image-overlay">
          <span className="overlay-text">Inspiring Change</span>
        </div>
      </div>

      <p className="inspiration-text">
        Join us in our mission to create a cleaner, healthier ocean. By reporting your marine-related activities and emissions, you are not only ensuring transparency but also taking a proactive step towards reducing your environmental impact. Together, we can drive meaningful change, innovate sustainable practices, and set a new standard for corporate responsibility in protecting our marine ecosystems.
      </p>
    </div>
  );
};

export default InspirationSection; 