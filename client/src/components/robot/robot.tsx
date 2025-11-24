import { RiRobot3Fill } from "@remixicon/react";
import { cva } from "class-variance-authority";
import { ArrowIcon } from "../ui/icons/arrow";

import styles from "./robot.module.css";
import { useSimulatorStore } from "../../stores/use-simulator";

const robot = cva(styles.base, {
  variants: {
    heading: {
      NORTH: styles.NORTH,
      SOUTH: styles.SOUTH,
      EAST: styles.EAST,
      WEST: styles.WEST,
    },
  },
  compoundVariants: [{ heading: "NORTH", className: styles.primaryMedium }],
  defaultVariants: {
    heading: "NORTH",
  },
});

export const Robot: React.FC = () => {
  const { heading } = useSimulatorStore();

  return (
    <div className={robot({ heading })}>
      <ArrowIcon variant={heading ?? "NORTH"} />
      <RiRobot3Fill size={38} className={styles.robot} />
    </div>
  );
};
