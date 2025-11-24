import React from "react";
import { RiArrowUpSLine } from "@remixicon/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { RiArrowRightSLine } from "@remixicon/react";
import styles from "./arrow.module.css";

export interface ArrowProps {
  variant: "NORTH" | "SOUTH" | "EAST" | "WEST";
}

export const ArrowIcon: React.FC<ArrowProps> = ({ variant = "NORTH" }) => {
  if (variant === "NORTH")
    return <RiArrowUpSLine className={styles.root} size={38} />;
  if (variant === "SOUTH")
    return <RiArrowDownSLine className={styles.root} size={38} />;
  if (variant === "WEST")
    return <RiArrowLeftSLine className={styles.root} size={38} />;
  if (variant === "EAST")
    return <RiArrowRightSLine className={styles.root} size={38} />;

  return null;
};
