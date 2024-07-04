import styles from "@/styles/NewAd.module.sass";
import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";
import type { SelectFieldProps } from "@/types";

export default function SelectField({
  label,
  required,
  options,
  isMulti,
  value,
  onChange,
  error,
  control,
  name,
}: SelectFieldProps) {
  return (
    <>
      <label className={styles["new-ad-form-label"]}>
        {label}{" "}
        {required && <span className={styles["new-ad-form-required"]}>*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: required }}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            options={options}
            isMulti={isMulti}
            isClearable
            value={value}
            onChange={onChange}
            className={styles["new-ad-form-select"]}
          />
        )}
      />
      {error && <span className="new-ad-form-error">{error.message}</span>}
    </>
  );
}
