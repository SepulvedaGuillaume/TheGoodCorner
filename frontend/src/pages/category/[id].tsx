import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GoBackButton from "@/components/GoBackButton";
import styles from "@/styles/AdDetailsPage.module.sass";
import Loader from "@/components/Loader";
import AdDetails from "@/components/AdDetails";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_AND_ADS_QUERY } from "@/graphql/categoriesQuery";
import type { Category, AdDetailsProps } from "@/types";
import {
  GetCategoryByIdQuery,
  GetCategoryByIdQueryVariables,
} from "@/__generated__/graphql";

export default function AdDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error, refetch } = useQuery<
    GetCategoryByIdQuery,
    GetCategoryByIdQueryVariables
  >(GET_CATEGORY_AND_ADS_QUERY, {
    variables: { getCategoryByIdId: id as string },
  });

  const [category, setCategory] = useState<Category | null>(null);
  const [ads, setAds] = useState<AdDetailsProps[]>([]);

  useEffect(() => {
    if (data) {
      setCategory(data.getCategoryById);
      setAds(data.getCategoryById.ads as AdDetailsProps[]);
    }
  }, [data]);

  const handleUpdateAds = () => {
    refetch();
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className={styles["ad-details-page-error"]}>Failed to load data.</p>
    );

  return (
    <div className={styles["ad-details-page-container"]}>
      <h1 className={styles["ad-details-page-title"]}>
        Catégorie: {category?.name}
      </h1>
      <GoBackButton />
      {ads.length === 0 && (
        <p className={styles["ad-details-page-no-items"]}>
          Aucun article trouvé pour cette catégorie.
        </p>
      )}
      <section className={styles["ads-search-section"]}>
        {ads.map((ad: AdDetailsProps) => (
          <AdDetails key={ad.id} {...ad} updateAds={handleUpdateAds} />
        ))}
      </section>
    </div>
  );
}
