import React, { useState } from 'react';
import { GiWaterDrop, GiWaveCrest, GiMountainRoad, GiWaterBottle } from 'react-icons/gi';
import CeruleanPollutionDashboard from '../ceruleanPollutionDashboard/CeruleanPollutionDashboard';
import './WaterIcons.scss';

type SelectedView = 'sea' | 'lakes' | 'rivers' | 'plastics';

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
  const [selectedView, setSelectedView] = useState<SelectedView | null>(null);

  const handleIconClick = (view: SelectedView) => {
    setSelectedView(view === selectedView ? null : view);
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
          {selectedView === 'sea' && <CeruleanPollutionDashboard />}
          {selectedView === 'lakes' && <div>Lakes Dashboard (Coming Soon)</div>}
          {selectedView === 'rivers' && <div>Rivers Dashboard (Coming Soon)</div>}
          {selectedView === 'plastics' && <div>Plastics Dashboard (Coming Soon)</div>}
        </div>
      )}
    </div>
  );
};

export default WaterIcons; 