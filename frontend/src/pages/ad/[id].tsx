import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdDetails from "@/components/AdDetails";
import type { AdDetailsProps } from "@/types";
import GoBackButton from "@/components/GoBackButton";
import styles from "@/styles/AdDetailsPage.module.sass";
import { useQuery } from "@apollo/client";
import { GET_AD_QUERY } from "@/graphql/adsQuery";
import Loader from "@/components/Loader";

export default function AdDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_AD_QUERY, {
    variables: { getAdByIdId: id },
  });

  const handleUpdateAds = (bool: boolean) => {
    bool && router.push("/");
  };

  if (loading) return <Loader />;
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className={styles["ad-details-page-container"]}>
      <GoBackButton />
      {data && <AdDetails {...data.getAdById} updateAds={handleUpdateAds} />}
    </div>
  );
}
