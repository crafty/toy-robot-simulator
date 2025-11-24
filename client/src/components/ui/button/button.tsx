import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import styles from "./button.module.css";

const button = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      outlined: styles.outlined,
    },
    disabled: {
      false: styles.enabled,
      true: styles.disabled,
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  disabled,
  ...props
}) => (
  <button
    className={button({ variant, disabled, className })}
    disabled={disabled || undefined}
    {...props}
  />
);
