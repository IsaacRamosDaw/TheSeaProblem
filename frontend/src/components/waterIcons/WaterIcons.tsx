import React, { useState } from 'react';
import { GiWaterDrop, GiWaveCrest, GiMountainRoad, GiWaterBottle } from 'react-icons/gi';
import CeruleanPollutionDashboard from '../ceruleanPollutionDashboard/CeruleanPollutionDashboard';
import './WaterIcons.scss';

interface WaterIconProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const WaterIcon: React.FC<WaterIconProps> = ({ icon, label, description, isSelected, onClick }) => (
  <div 
    className={`water-icon-container ${isSelected ? 'selected' : ''}`} 
    onClick={onClick}
  >
    <div className="water-icon">{icon}</div>
    <div className="water-icon-label">{label}</div>
    <div className="water-icon-description">{description}</div>
  </div>
);

const WaterIcons: React.FC = () => {
  const [selectedView, setSelectedView] = useState<string | null>(null);

  const handleIconClick = (view: string) => {
    setSelectedView(view === selectedView ? null : view);
  };

  const renderSelectedComponent = () => {
    switch (selectedView) {
      case 'sea':
        return <CeruleanPollutionDashboard />;
      case 'lakes':
        return <div>Lakes Dashboard (Coming Soon)</div>;
      case 'rivers':
        return <div>Rivers Dashboard (Coming Soon)</div>;
      case 'plastics':
        return <div>Plastics Dashboard (Coming Soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="water-icons-wrapper">
      <div className="water-icons-container">
        <WaterIcon
          icon={<GiWaveCrest size={40} />}
          label="Sea"
          description="Pollution in oceans and seas"
          isSelected={selectedView === 'sea'}
          onClick={() => handleIconClick('sea')}
        />
        <WaterIcon
          icon={<GiWaterDrop size={40} />}
          label="Lakes"
          description="Pollution in stagnant water bodies"
          isSelected={selectedView === 'lakes'}
          onClick={() => handleIconClick('lakes')}
        />
        <WaterIcon
          icon={<GiMountainRoad size={40} />}
          label="Rivers"
          description="Pollution in water courses"
          isSelected={selectedView === 'rivers'}
          onClick={() => handleIconClick('rivers')}
        />
        <WaterIcon
          icon={<GiWaterBottle size={40} />}
          label="Plastics"
          description="Pollution from plastic waste"
          isSelected={selectedView === 'plastics'}
          onClick={() => handleIconClick('plastics')}
        />
      </div>
      {selectedView && (
        <div className="selected-component">
          {renderSelectedComponent()}
        </div>
      )}
    </div>
  );
};

export default WaterIcons; 