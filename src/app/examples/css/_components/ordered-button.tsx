// Import order = CSS order: BaseButton (and its CSS) first, this CSS second.
import { BaseButton } from "./base-button";
import styles from "./ordered-button.module.css";

export function OrderedButton() {
  return (
    <div className="flex flex-wrap gap-3">
      <BaseButton>BaseButton alone (gray)</BaseButton>
      <BaseButton className={styles.primary}>
        With styles.primary (brand wins)
      </BaseButton>
    </div>
  );
}
