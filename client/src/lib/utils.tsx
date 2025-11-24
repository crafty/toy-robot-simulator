import type { Coordinates, Heading, Rotation } from "../interfaces/simulator";
import { HEADINGS } from "./constants";

export const createSessionId = (): string => crypto.randomUUID();

export function rotateHeading(current: Heading, rotation: Rotation): Heading {
  const idx = HEADINGS.indexOf(current);
  if (idx === -1) return current;

  if (rotation === "LEFT") {
    return HEADINGS[(idx + 3) % 4];
  }

  if (rotation === "RIGHT") {
    return HEADINGS[(idx + 1) % 4];
  }

  return current;
}

export function getNextPosition(
  position: Coordinates,
  heading: Heading
): Coordinates {
  let { x, y } = position;

  switch (heading) {
    case "NORTH":
      y += 1;
      break;
    case "SOUTH":
      y -= 1;
      break;
    case "EAST":
      x += 1;
      break;
    case "WEST":
      x -= 1;
      break;
  }

  return { x, y };
}

export function isWithinBoard({ x, y }: Coordinates): boolean {
  return x >= 0 && x <= 4 && y >= 0 && y <= 4;
}
