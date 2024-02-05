// robotActions.js
import * as actionTypes from './robotConstants';

export const placeRobot = (x, y, direction) => ({
  type: actionTypes.PLACE_ROBOT,
  payload: { x, y, direction },
});

export const moveRobot = () => ({ type: actionTypes.MOVE_ROBOT });

export const leftRotateRobot = () => ({ type: actionTypes.LEFT_ROTATE_ROBOT });

export const rightRotateRobot = () => ({ type: actionTypes.RIGHT_ROTATE_ROBOT });

export const reportRobot = () => ({ type: actionTypes.REPORT_ROBOT });

export const resetRobot = () => ({ type: actionTypes.RESET_ROBOT });
