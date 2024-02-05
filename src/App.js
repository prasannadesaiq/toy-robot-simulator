// App.js
import React, { useState } from 'react';
import RobotSimulator from './components/RobotSimulator.js';
import RobotDisplay from './components/RobotDisplay.js';
import Instructions from './components/Instructions.js';
import './styles.css';
import { DESCRIPTIONS, INSTRUCTIONS } from './configs/constants.js';

const App = () => {
  const [showRobotDisplay, setShowRobotDisplay] = useState(false);

  const handleReportClick = (show) => {
    setShowRobotDisplay(show);
  };

  return (
    <div className="app-container">
      <h2 className='game-title'>TOY ROBOT SIMULATOR</h2>
      <Instructions title="Descriptions" content={DESCRIPTIONS} />
      <Instructions title="Instructions" content={INSTRUCTIONS} />
      <RobotSimulator onReportClick={handleReportClick} />
      {showRobotDisplay && <RobotDisplay setShowRobotDisplay={setShowRobotDisplay} />}
    </div>
  );
};

export default App;
