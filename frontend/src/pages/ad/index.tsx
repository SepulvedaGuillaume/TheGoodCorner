import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import adService from "@/services/api/adService";
import type { Ad } from "@/types";
import Loader from "@/components/Loader";
import styles from "@/styles/SearchPage.module.sass";
import AdCard from "@/components/AdCard";

export default function SearchPage() {
  const router = useRouter();
  const { search } = router.query;
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = async () => {
    try {
      const ads = await adService.searchByTitleOrCategory(search as string);
      const sortedAds = ads
        ? (ads.sort((a, b) => (a.title > b.title ? 1 : -1)) as Ad[])
        : [];
      setAds(sortedAds);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  const fetchAllAds = async () => {
    try {
      const ads = await adService.getAds();
      const sortedAds = ads
        ? (ads.sort((a, b) => (a.title > b.title ? 1 : -1)) as Ad[])
        : [];
      setAds(sortedAds);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!search) {
      setSearchQuery("Toutes les annonces");
      fetchAllAds();
      return;
    }

    if (typeof search === "string" && isNaN(Number(search))) {
      setSearchQuery(search);
      fetchSearchResults();
    } else {
      setError("La recherche doit être une chaîne de caractères.");
      setIsLoading(false);
    }
  }, [search]);

  const handleUpdateAds = () => {
    setIsLoading(true);
    if (searchQuery === "Toutes les annonces") {
      fetchAllAds();
    } else if (searchQuery) {
      fetchSearchResults();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Recherche annonce(s)</h2>
      <p>
        Annonce(s) recherchée(s) pour :{" "}
        <span className={styles["ads-search-query"]}>{searchQuery}</span>
      </p>
      {error && <p className={styles["ads-search-error"]}>{error}</p>}
      {isLoading && !error ? (
        <Loader />
      ) : (
        !error && (
          <section className={styles["ads-search-section"]}>
            {ads && ads.length > 0 && !isLoading ? (
              ads.map((ad) => (
                <AdCard key={ad.id} updateAds={handleUpdateAds} {...ad} />
              ))
            ) : (
              <p className={styles["ads-search-no-ad"]}>
                Aucune annonce trouvée
              </p>
            )}
          </section>
        )
      )}
    </div>
  );
}
