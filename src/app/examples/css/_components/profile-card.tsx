import styles from "./profile-card.module.css";

export function ProfileCard() {
  return (
    <div className={styles.card}>
      <p className="font-medium">ProfileCard</p>
      <p className="font-mono text-xs">className=&quot;{styles.card}&quot;</p>
    </div>
  );
}
