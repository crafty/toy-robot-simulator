import { useSimulatorStore } from "../../stores/use-simulator";
import { BOARD_COORDINATES } from "../../lib/constants";
import styles from "./gameboard.module.css";
import { Robot } from "../robot/robot";

export const GameBoard: React.FC = () => {
  const { setNewRobot, position } = useSimulatorStore();

  return (
    <div className={styles.container}>
      {BOARD_COORDINATES.map((coordinates, i) => {
        const shouldRenderRobot =
          position?.x === coordinates.x && position?.y === coordinates.y;

        return (
          <div
            key={`(${coordinates.x},${coordinates.y}-${i})`}
            className={styles.box}
            onClick={() => setNewRobot(coordinates)}
          >
            {shouldRenderRobot && <Robot />}
            {/* <div
              className={styles.testLabel}
            >{`(${coordinates.x}, ${coordinates.y})`}</div> */}
          </div>
        );
      })}
    </div>
  );
};
