import styles from "./banner.module.css";

export const Banner = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.banner}>{children}</div>;
};
