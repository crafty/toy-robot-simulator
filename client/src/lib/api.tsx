import type { Coordinates, Heading } from "../interfaces/simulator";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface MovementPayload extends Coordinates {
  heading: Heading;
}

export async function saveMovementApi(
  sessionId: string,
  movement: MovementPayload
) {
  const res = await fetch(`${API_BASE_URL}/movements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, position: movement }),
  });

  if (!res.ok) {
    throw new Error(`Failed to save movement: ${res.status}`);
  }

  return res.json();
}

export async function loadLastPosition(sessionId: string) {
  const res = await fetch(
    `${API_BASE_URL}/movements/session/${sessionId}/last`
  );

  if (!res.ok) return null;

  return res.json();
}
