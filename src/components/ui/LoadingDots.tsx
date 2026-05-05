import styles from './LoadingDots.module.css';

export function LoadingDots() {
  return (
    <span
      className={styles.wrap}
      role="status"
      aria-label="로딩 중"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
    </span>
  );
}
