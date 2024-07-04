import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES_QUERY } from "@/graphql/categoriesQuery";
import type {
  CategoryProps,
  CategoryContextProps,
  CategoryProviderProps,
} from "@/types";
import {
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
} from "@/__generated__/graphql";

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const { data, loading, error } = useQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (data && !loading && !error) {
      const sortedCategories = [...data.getAllCategories].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedCategories);
    }
  }, [data, loading, error]);

  const updateCategories = () => {
    if (data) {
      const sortedCategories = [...data.getAllCategories].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedCategories);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, updateCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
