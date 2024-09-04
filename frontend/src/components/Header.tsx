import { useEffect } from "react";
import Category from "./Category";
import styles from "@/styles/Header.module.sass";
import { useBasket } from "@/contexts/basketContext";
import { useCategory } from "@/contexts/categoryContext";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";

export default function Header() {
  const { totalBasketPrice } = useBasket();
  const { categories } = useCategory();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  useEffect(() => {
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles["main-menu"]}>
        <h1>
          <Link
            href="/"
            className={`${styles.button} ${styles.logo} ${styles["link-button"]}`}
          >
            <span className={`${styles["mobile-short-label"]}`}>TGC</span>
            <span className={`${styles["desktop-long-label"]}`}>
              THE GOOD CORNER
            </span>
          </Link>
        </h1>
        <SearchBar />
        <p className={styles["basket-total"]}>
          Prix total :{" "}
          <span className={styles["basket-total-price"]}>
            {totalBasketPrice} €
          </span>
        </p>
        <Link
          href="/ad/new"
          className={`${styles.button} ${styles["link-button"]}`}
        >
          <span className={`${styles["mobile-short-label"]}`}>Publier</span>
          <span className={`${styles["desktop-long-label"]}`}>
            Publier une annonce
          </span>
        </Link>
        <div className={styles["auth-buttons"]}>
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className={`${styles.button} ${styles["link-button"]}`}
              >
                <span className={`${styles["mobile-short-label"]}`}>
                  Connexion
                </span>
                <span className={`${styles["desktop-long-label"]}`}>
                  Connexion
                </span>
              </Link>
              <Link
                href="/register"
                className={`${styles.button} ${styles["link-button"]}`}
              >
                <span className={`${styles["mobile-short-label"]}`}>
                  Inscription
                </span>
                <span className={`${styles["desktop-long-label"]}`}>
                  Inscription
                </span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className={`${styles.button} ${styles["link-button"]}`}
            >
              <span className={`${styles["mobile-short-label"]}`}>
                Déconnexion
              </span>
              <span className={`${styles["desktop-long-label"]}`}>
                Déconnexion
              </span>
            </button>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <nav className={styles["categories-navigation"]}>
          {categories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </nav>
      )}
    </header>
  );
}
