import styles from "./layout.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
