import styles from "./component.module.scss";

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
    </div>
  );
}
