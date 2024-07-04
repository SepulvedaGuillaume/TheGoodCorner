import axios from "axios";
import type { FormData } from "@/types";
import type { AdCardProps, PostAd } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const adService = {
  getAds: async () => {
    try {
      const response = await axios.get<AdCardProps[]>(`${BASE_URL}/ads-orm`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ad:", error);
    }
  },

  getAd: async (id: number) => {
    try {
      const response = await axios.get<AdCardProps>(
        `${BASE_URL}/ads-orm/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ad:", error);
    }
  },

  postAd: async (ad: FormData) => {
    try {
      const response = await axios.post<PostAd>(`${BASE_URL}/ads-orm`, ad);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Failed to post ad:", error);
    }
  },

  deleteAd: async (id: number) => {
    try {
      const response = await axios.delete<AdCardProps[]>(
        `${BASE_URL}/ads-orm/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  },

  searchByTitleOrCategory: async (search: string) => {
    try {
      const response = await axios.get<AdCardProps[]>(
        `${BASE_URL}/ads-orm/search/${search}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to search ad:", error);
    }
  },

  updateAd: async (id: number, ad: FormData) => {
    try {
      const response = await axios.put<AdCardProps>(
        `${BASE_URL}/ads-orm/${id}`,
        ad
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update ad:", error);
    }
  },
};

export default adService;
