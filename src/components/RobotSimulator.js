// RobotSimulator.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR_MESSAGES, DIRECTIONS, COMMANDS } from '../configs/constants';
import {
  placeRobot,
  moveRobot,
  leftRotateRobot,
  rightRotateRobot,
  reportRobot,
  resetRobot,
} from '../redux/robotActions';
import './RobotSimulator.css';

const RobotSimulator = ({
  placeRobot,
  moveRobot,
  leftRotateRobot,
  rightRotateRobot,
  reportRobot,
  resetRobot,
  onReportClick,
  robotState
}) => {
  const [command, setCommand] = useState('');

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const canMoveForward = (x, y, direction) => {
    // Check if the robot can move forward without falling off the table
    switch (direction) {
      case DIRECTIONS.NORTH:
        return y < 4;
      case DIRECTIONS.SOUTH:
        return y > 0;
      case DIRECTIONS.EAST:
        return x < 4;
      case DIRECTIONS.WEST:
        return x > 0;
      default:
        return false;
    }
  };

  const isRobotPlaced = () => {
    const { x, y, direction } = robotState;
    return x !== null && y !== null && direction !== null;
  };

  const isPlaceOrReportCommand = (command) => {
    const upperCaseCommand = command.toUpperCase();
    return upperCaseCommand.startsWith(COMMANDS.PLACE) || upperCaseCommand === COMMANDS.REPORT;
  };

  const handleRunCommand = () => {
    try {
      if (!isRobotPlaced() && !isPlaceOrReportCommand(command)) {
        throw new Error(ERROR_MESSAGES.ROBOT_NOT_PLACED);
      }
      if (command.toUpperCase().startsWith(COMMANDS.PLACE)) {
        const [, x, y, direction] = command.toUpperCase().match(/PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)/) || [];
        if (x !== undefined && y !== undefined && direction !== undefined) {
          const parsedX = parseInt(x);
          const parsedY = parseInt(y);

          if (parsedX >= 0 && parsedX <= 4 && parsedY >= 0 && parsedY <= 4) {
            placeRobot(parsedX, parsedY, direction);
          } else {
            throw new Error(ERROR_MESSAGES.INVALID_PLACE_COORDINATES);
          }
        } else {
          throw new Error(ERROR_MESSAGES.INVALID_PLACE_COMMAND);
        }
      } else if (command.toUpperCase() === COMMANDS.MOVE) {
        const { x, y, direction } = robotState;
        if (!canMoveForward(x, y, direction)) {
          throw new Error(ERROR_MESSAGES.CANNOT_MOVE_FORWARD);
        }
        moveRobot();
      } else if (command.toUpperCase() === COMMANDS.LEFT) {
        leftRotateRobot();
      } else if (command.toUpperCase() === COMMANDS.RIGHT) {
        rightRotateRobot();
      } else if (command.toUpperCase() === COMMANDS.REPORT) {
        onReportClick(true);
        reportRobot();
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_COMMAND);
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-left', autoClose: 3000 });
    }
  };

  const handleReset = () => {
    resetRobot();
    onReportClick(false);
    setCommand('');
  };

  return (
    <div className="robot-simulator">
      <input
        className="command-input"
        type="text"
        value={command.toUpperCase()}
        onChange={handleCommandChange}
        placeholder="Enter command..."
      />
      <div className="command-buttons">
        <button className="command-button" onClick={handleRunCommand}>
          RUN COMMAND
        </button>
        <button className="command-button" onClick={handleReset}>
          RESET
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  robotState: state,
});

const mapDispatchToProps = {
  placeRobot,
  moveRobot,
  leftRotateRobot,
  rightRotateRobot,
  reportRobot,
  resetRobot,
};

export default connect(mapStateToProps, mapDispatchToProps)(RobotSimulator);
