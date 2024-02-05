// RobotDisplay.js
import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './RobotDisplay.css';

const RobotDisplay = ({ robotState, setShowRobotDisplay }) => {
  const { x, y, direction } = robotState;

  const handleClose = () => {
    setShowRobotDisplay(false);
  };

  return (
    <div className="robot-display-container">
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Robot Position</DialogTitle>
        <DialogContent>
          {x !== null && y !== null && direction !== null ? (
            <p className="robot-state">
              X: {x}, Y: {y}, Direction: {direction}
            </p>
          ) : (
            <p className="robot-not-placed">Robot is not placed on the table yet.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  robotState: state,
});

export default connect(mapStateToProps)(RobotDisplay);
