import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "@/components/Loader";
import styles from "@/styles/SearchPage.module.sass";
import AdCard from "@/components/AdCard";
import { SEARCH_ADS_QUERY } from "@/graphql/adsQuery";
import {
  SearchAdsQuery,
  SearchAdsQueryVariables,
} from "@/__generated__/graphql";

export default function SearchPage() {
  const router = useRouter();
  const { search } = router.query;
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery<
    SearchAdsQuery,
    SearchAdsQueryVariables
  >(SEARCH_ADS_QUERY, {
    variables: { searchTerm: search as string },
  });

  const [ads, setAds] = useState<SearchAdsQuery["searchAds"]>([]);

  useEffect(() => {
    if (data && !loading && !error) {
      const sortedAds = [...data.searchAds].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setAds(sortedAds);
    }
  }, [data, loading, error]);

  useEffect(() => {
    setSearchQuery(search as string | null);
  }, [search]);

  const handleUpdateAds = () => {
    refetch();
    if (data) {
      const sortedAds = [...data.searchAds].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setAds(sortedAds);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <p className={styles["ads-search-error"]}>{error.message}</p>;

  return (
    <div>
      <h2>Recherche annonce(s)</h2>
      <p>
        Annonce(s) recherchée(s) pour :{" "}
        <span className={styles["ads-search-query"]}>{searchQuery}</span>
      </p>
      {ads.length === 0 && !loading && (
        <p className={styles["ads-search-no-ad"]}>Aucune annonce trouvée</p>
      )}
      <section className={styles["ads-search-section"]}>
        {ads.map((ad) => (
          <AdCard key={ad.id} updateAds={handleUpdateAds} {...ad} />
        ))}
      </section>
    </div>
  );
}
