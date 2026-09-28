import styles from "./base-button.module.css";

export function BaseButton({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
