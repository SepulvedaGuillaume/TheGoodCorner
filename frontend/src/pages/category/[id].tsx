import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GoBackButton from "@/components/GoBackButton";
import styles from "@/styles/AdDetailsPage.module.sass";
import categoryService from "@/services/api/categoryService";
import Loader from "@/components/Loader";
import type { CategoryProps, AdDetailsPage } from "@/types";
import AdDetails from "@/components/AdDetails";

export default function AdDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [ads, setAds] = useState<AdDetailsPage[]>([]);
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (idInt: number) => {
    setIsLoading(true);
    try {
      const [categoryResult, adsResult] = await Promise.all([
        categoryService.getCategory(idInt),
        categoryService.getAdsByCategory(idInt)
      ]);
      setCategory(categoryResult as CategoryProps);
      const sortedAds = adsResult?.sort((a, b) => a.price - b.price);
      setAds(sortedAds as AdDetailsPage[]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (id) {
      const idInt = parseInt(id as string);
      fetchData(idInt);
    }
  }, [id]);

  const handleUpdateAds = () => {
    fetchData(parseInt(id as string));
  }

  return (
    <div className={styles["ad-details-page-container"]}>
      <h1 className={styles["ad-details-page-title"]}>
        Catégorie: {category?.name}
      </h1>
      <GoBackButton />
      {isLoading ? (
        <Loader />
      ) : (
        ads.map((ad) => <AdDetails key={ad.id} updateAds={handleUpdateAds} {...ad} />)
      )}
      {ads.length === 0 && !isLoading && (
        <p className={styles["ad-details-page-no-items"]}>
          Aucun article trouvé pour cette catégorie.
        </p>
      )}
    </div>
  );
}
