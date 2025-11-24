import { create } from "zustand";
import { createSessionId } from "../lib/utils";
import { SESSION_KEY, DEFAULT_HEADING } from "../lib/constants";
import type { Coordinates, Heading, Rotation } from "../interfaces/simulator";
import { toast } from "react-toastify";
import {
  saveMovementApi,
  loadLastPosition,
  type MovementPayload,
} from "../lib/api";
import { rotateHeading, getNextPosition, isWithinBoard } from "../lib/utils";

interface SimulatorState {
  sessionId: string;
  position: Coordinates | null;
  heading: Heading | null;
  loading: boolean;
  initSession: () => Promise<void>;
  setHeading: (rotation: Rotation) => void;
  setPosition: () => Promise<void>;
  setNewRobot: (position: Coordinates) => Promise<void>;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  sessionId: "",
  position: null,
  heading: null,
  loading: false,
  initSession: async () => {
    const storedSessionId = localStorage.getItem(SESSION_KEY);
    if (!storedSessionId) {
      toast.info("No Session Id found. Creating new session.");
      const id = createSessionId();
      localStorage.setItem(SESSION_KEY, id);
      set({ sessionId: id });
      return;
    }

    set({ sessionId: storedSessionId });

    // Load last position from API since we have a sessionId but per the the AC keep the movements in Sqlite
    try {
      set({ loading: true });
      const last = await loadLastPosition(storedSessionId);
      toast.success(
        "Loaded last position: " +
          `(${last.x}, ${last.y}) facing ${last.heading}`
      );
      set({
        sessionId: storedSessionId,
        position: { x: last.x, y: last.y },
        heading: last.heading,
      });
    } catch (error) {
      console.warn("Error loading last position:", error);
      toast.warn("Couldn't find your last position, place your robot.");
    } finally {
      set({ loading: false });
    }
  },

  setHeading: (rotation) => {
    const { heading } = get();
    if (!heading) return;

    const newHeading = rotateHeading(heading, rotation);
    set({ heading: newHeading });
  },

  setPosition: async () => {
    const { position, heading, sessionId } = get();
    if (!position || !heading || !sessionId) return;

    const next = getNextPosition(position, heading);
    if (!isWithinBoard(next)) {
      console.warn("Invalid move: Robot would fall off the board.");
      toast.error("Invalid move: Robot would fall off the board.");
      return; // ignore invalid move
    }

    const payload: MovementPayload = { ...next, heading };

    try {
      set({ loading: true });
      const res = await saveMovementApi(sessionId, payload);
      console.log("Movement saved:", res);
      toast.success(
        "Movement saved successfully: " +
          `(${res.x}, ${res.y}) facing ${res.heading}`
      );
      set({ position: next });
    } catch (error) {
      console.error(error);
      toast.error("Error saving movement. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  setNewRobot: async (position: Coordinates) => {
    const { sessionId } = get();
    console.log("Setting new robot at:", position, sessionId);
    if (!sessionId) return;

    const payload: MovementPayload = {
      ...position,
      heading: DEFAULT_HEADING,
    };

    try {
      const res = await saveMovementApi(sessionId, payload);
      console.log("Robot Set saved:", res);
      toast.success(
        "Movement saved successfully: " +
          `(${res.x}, ${res.y}) facing ${res.heading}`
      );

      set({ position, heading: DEFAULT_HEADING });
    } catch (error) {
      console.error(error);
      toast.error("Error saving movement. Please try again.");
    }
  },
}));
