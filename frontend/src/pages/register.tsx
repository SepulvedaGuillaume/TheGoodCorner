import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/NewAd.module.sass";
import Loader from "@/components/Loader";
import InputField from "@/components/InputField";
import type { RegisterFormData } from "@/types";
import { useMutation } from "@apollo/client";
import { USER_REGISTER_MUTATION } from "@/graphql/userMutation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const [registerUser] = useMutation(USER_REGISTER_MUTATION);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data, event) => {
    setSuccess(false);
    setError(null);
    setIsLoading(true);
    try {
      event?.preventDefault();

      if (data.password !== data.confirmPassword) {
        setError(new Error("Les mots de passe ne correspondent pas"));
        setIsLoading(false);
        return;
      }

      const response = await registerUser({
        variables: {
          email: data.email,
          password: data.password,
          role: "USER",
        },
      });

      if (response?.data?.createUser) {
        setSuccess(true);
        setError(null);
        reset();
      } else {
        setError(new Error("Registration failed"));
      }
    } catch (err) {
      console.error("Failed to register:", err);
      setError(new Error("An error occurred during registration"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles["new-ad-container"]}>
      <h1 className={styles["new-ad-title"]}>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["new-ad-form"]}>
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          required={true}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          required={true}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          required={true}
          error={errors.confirmPassword}
        />
        <button type="submit" className={styles["new-ad-form-button"]}>
          S'inscrire
        </button>
        {error && (
          <span className={styles["new-ad-form-error"]}>{error.message}</span>
        )}
        {success && (
          <span className={styles["new-ad-form-success"]}>
            Inscription réussie
          </span>
        )}
      </form>
    </div>
  );
}
