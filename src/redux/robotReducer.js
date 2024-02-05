// robotReducer.js
import * as actionTypes from './robotConstants';

const initialState = {
  x: null,
  y: null,
  direction: null,
};

const robotReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ROBOT:
      const { x, y, direction } = action.payload;
      if (isValidPosition(x, y) && isValidDirection(direction)) {
        return {
          ...state,
          x,
          y,
          direction,
          errorMessage: null,
        };
      } else {
        let errorMessage;
        if (!isValidPosition(x, y)) {
          errorMessage = 'Invalid PLACE command. Coordinates are out of bounds.';
        } else if (!isValidDirection(direction)) {
          errorMessage = 'Invalid PLACE command. Invalid direction.';
        }
        return {
          ...state,
          errorMessage,
        };
      }
    case actionTypes.MOVE_ROBOT:
      return moveRobot(state);
    case actionTypes.LEFT_ROTATE_ROBOT:
      return rotateRobot(state, 'LEFT');
    case actionTypes.RIGHT_ROTATE_ROBOT:
      return rotateRobot(state, 'RIGHT');
    case actionTypes.REPORT_ROBOT:
      return {
        ...state,
        errorMessage: null,
      };
    case actionTypes.RESET_ROBOT:
      return initialState;
    default:
      return {
        ...state,
        errorMessage: 'Invalid command.',
      };
  }
};

const isValidPosition = (x, y) => {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x <= 4 && y >= 0 && y <= 4;
};

const isValidDirection = (direction) => {
  return ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction);
};


// Helper function to handle MOVE logic
const moveRobot = (state) => {
  const { x, y, direction } = state;
  let newX = x;
  let newY = y;

  switch (direction) {
    case 'NORTH':
      newY = Math.min(y + 1, 4); // Prevent falling off the table
      break;
    case 'SOUTH':
      newY = Math.max(y - 1, 0);
      break;
    case 'EAST':
      newX = Math.min(x + 1, 4);
      break;
    case 'WEST':
      newX = Math.max(x - 1, 0);
      break;
    default:
      break;
  }

  return {
    ...state,
    x: newX,
    y: newY,
  };
};

// Helper function to handle LEFT and RIGHT rotation logic
const rotateRobot = (state, direction) => {
  const { direction: currentDirection } = state;
  let newDirection;

  if (direction === 'LEFT') {
    switch (currentDirection) {
      case 'NORTH':
        newDirection = 'WEST';
        break;
      case 'WEST':
        newDirection = 'SOUTH';
        break;
      case 'SOUTH':
        newDirection = 'EAST';
        break;
      case 'EAST':
        newDirection = 'NORTH';
        break;
      default:
        newDirection = currentDirection;
        break;
    }
  } else if (direction === 'RIGHT') {
    switch (currentDirection) {
      case 'NORTH':
        newDirection = 'EAST';
        break;
      case 'EAST':
        newDirection = 'SOUTH';
        break;
      case 'SOUTH':
        newDirection = 'WEST';
        break;
      case 'WEST':
        newDirection = 'NORTH';
        break;
      default:
        newDirection = currentDirection;
        break;
    }
  }

  return {
    ...state,
    direction: newDirection,
  };
};

export default robotReducer;
