import styles from "./product-card.module.css";

export function ProductCard() {
  return (
    <div className={styles.card}>
      <p className="font-medium">ProductCard</p>
      <p className="font-mono text-xs">className=&quot;{styles.card}&quot;</p>
    </div>
  );
}
