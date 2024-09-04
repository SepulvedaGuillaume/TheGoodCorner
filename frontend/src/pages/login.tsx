import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/NewAd.module.sass";
import Loader from "@/components/Loader";
import InputField from "@/components/InputField";
import type { LoginFormData } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN_QUERY } from "@/graphql/userQuery";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();
  const [loginUser] = useLazyQuery(USER_LOGIN_QUERY);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const onSubmit: SubmitHandler<LoginFormData> = async (data, event) => {
    setSuccess(false);
    setError(null);
    setIsLoading(true);
    try {
      event?.preventDefault();
      const response = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response?.data?.login) {
        localStorage.setItem("token", response.data.login);
        setIsAuthenticated(true);
        setSuccess(true);
        setError(null);
        reset();
        router.push("/");
      } else {
        setError(new Error("Email/password incorrect"));
      }
    } catch (err) {
      console.error("Failed to log in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles["new-ad-container"]}>
      <h1 className={styles["new-ad-title"]}>Connexion</h1>
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
          label="Mot de passe"
          name="password"
          type="password"
          register={register}
          required={true}
          error={errors.password}
        />
        <button type="submit" className={styles["new-ad-form-button"]}>
          Se connecter
        </button>
        {error && (
          <span className={styles["new-ad-form-error"]}>{error.message}</span>
        )}
        {success && (
          <span className={styles["new-ad-form-success"]}>
            Connexion réussie
          </span>
        )}
      </form>
    </div>
  );
}
