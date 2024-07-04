import { useState, useEffect } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import Loader from "./Loader";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphql/adsQuery";
import type { Ad } from "@/types";

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const { loading, error, data, refetch } = useQuery(GET_ALL_ADS_QUERY);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (data && !loading && !error) {
      const sortedAds = [...data.getAllAds].sort((a: Ad, b: Ad) =>
        a.title.localeCompare(b.title)
      );
      setAds(sortedAds);
    }
  }, [data, loading, error]);

  const handleUpdateAds = () => {
    setLoading(true);
    try {
      refetch();

      if (data) {
        const sortedAds = [...data.getAllAds].sort((a: Ad, b: Ad) =>
          a.title.localeCompare(b.title)
        );
        setAds(sortedAds);
      }
    } catch (error) {
      console.error("Failed to update ads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Annonces récentes</h2>
      {loading || isLoading ? (
        <Loader />
      ) : (
        <section className={styles["recent-ads"]}>
          {ads && ads.length > 0 && !loading ? (
            ads.map((ad) => (
              <AdCard key={ad.id} updateAds={handleUpdateAds} {...ad} />
            ))
          ) : (
            <p>Aucune annonce trouvée</p>
          )}
        </section>
      )}
      {error && <p>Une erreur est survenue</p>}
    </div>
  );
}
