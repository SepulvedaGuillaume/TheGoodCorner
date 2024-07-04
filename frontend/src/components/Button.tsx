import styles from "@/styles/Button.module.sass";
import type { ButtonProps } from "@/types";

export default function Button({
  label,
  onClickButton,
  stylesName,
}: ButtonProps) {
  return (
    <button className={styles[stylesName]} onClick={onClickButton}>
      {label}
    </button>
  );
}
