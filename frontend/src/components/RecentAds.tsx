import { useState, useEffect } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import Loader from "./Loader";
import { CategoryProps } from "./Category";
import { TagProps } from "@/services/api/tagService";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphql/adsQuery";

export interface Ad {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price: number;
  picture?: string;
  location: string;
  createdAt: string;
  category: CategoryProps;
  tags?: TagProps[];
}

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_ADS_QUERY);

  const fetchAds = async () => {
    try {
      const ads = data?.getAllAds;
      const sortedAds = ads
        ? (ads.sort((a: { title: number }, b: { title: number }) =>
            a.title > b.title ? 1 : -1
          ) as Ad[])
        : [];
      setAds(sortedAds);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleUpdateAds = () => {
    fetchAds();
  };
  return (
    <div>
      <h2>Annonces récentes</h2>
      {loading ? (
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
