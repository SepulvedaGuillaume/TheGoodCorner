import { useState, useEffect } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import Loader from "./Loader";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphql/adsQuery";
import { GetAllAdsQuery, GetAllAdsQueryVariables } from "@/__generated__/graphql";
import { useAuth } from "@/contexts/authContext";  // Assurez-vous que ce chemin est correct

export default function RecentAds() {
  const { isAuthenticated } = useAuth();
  const { loading, error, data, refetch } = useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GET_ALL_ADS_QUERY, {
    skip: !isAuthenticated,
  });
  const [ads, setAds] = useState<GetAllAdsQuery["getAllAds"]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (data && !loading && !error) {
      const sortedAds = [...data.getAllAds].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setAds(sortedAds);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  const handleUpdateAds = () => {
    if (data) {
      const sortedAds = [...data.getAllAds].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setAds(sortedAds);
    }
  };

  if (!isAuthenticated) {
    return <p>Veuillez vous connecter pour voir les annonces.</p>;
  }

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
