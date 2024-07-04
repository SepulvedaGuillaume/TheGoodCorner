import styles from "@/styles/NewAd.module.sass";
import type { TextAreaFieldProps } from "@/types";

export default function TextAreaField({
  label,
  name,
  register,
  required,
}: TextAreaFieldProps) {
  return (
    <>
      <label className={styles["new-ad-form-label"]}>{label}</label>
      <textarea
        {...register(name, { required })}
        className={styles["new-ad-form-textarea"]}
      />
    </>
  );
}
