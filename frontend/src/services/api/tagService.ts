import axios from "axios";
import type { TagProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const tagService = {
  getTags: async () => {
    try {
      const response = await axios.get<TagProps []>(`${BASE_URL}/tags-orm`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },
};

export default tagService;
