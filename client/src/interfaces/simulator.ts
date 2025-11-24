export interface Coordinates {
  x: number;
  y: number;
}

export type Heading = "NORTH" | "SOUTH" | "EAST" | "WEST";

export type sessionId = string;

export interface Position {
  x: number;
  y: number;
  heading: Heading;
}

export interface Movement {
  sessionId: sessionId;
  position: Position;
}

export type Rotation = "LEFT" | "RIGHT";
