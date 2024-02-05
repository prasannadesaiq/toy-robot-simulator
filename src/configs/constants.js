export const DESCRIPTIONS = [
  'The application simulates a toy robot navigating on a square tabletop with dimensions of 5 units x 5 units.',
  'The tabletop is free of any obstructions, allowing the robot to move around without hindrance.',
  'While the robot can freely explore the table, measures are in place to prevent it from falling off the table and sustaining damage.',
  'Actions resulting in the robot falling off the table are restricted, but valid movement commands continue to be permitted.'
];

export const INSTRUCTIONS = [
  'PLACE X,Y,F - Positions the toy robot on the table at coordinates X,Y, facing either NORTH, SOUTH, EAST, or WEST.',
  'MOVE - Advances the toy robot by one unit in its current facing direction.',
  'LEFT | RIGHT - Rotates the robot by 90 degrees in the specified direction without altering its position on the table.',
  'REPORT - Displays the current X, Y, and F (facing direction) of the robot. The format is flexible, but standard output is acceptable.'
];

export const ERROR_MESSAGES = {
  INVALID_PLACE_COORDINATES: 'Invalid PLACE command. Coordinates must be between 0 and 4.',
  INVALID_PLACE_COMMAND: 'Invalid PLACE command. Please provide valid coordinates and direction.',
  CANNOT_MOVE_FORWARD: 'The robot can\'t move forward in that direction. It may fall off the table.',
  INVALID_COMMAND: 'Invalid command. Valid commands are PLACE, MOVE, LEFT, RIGHT, REPORT.',
  ROBOT_NOT_PLACED: 'Robot is not placed on the table yet. Place the robot first.',
};

export const DIRECTIONS = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
};

export const COMMANDS = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  REPORT: 'REPORT',
};
