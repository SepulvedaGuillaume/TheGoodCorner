import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

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

export interface Category {
  id: number;
  name: string;
}

export interface AdCardProps {
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
  updateAds: () => void;
}

export interface CategoryProps {
  id: number;
  name: string;
}

export interface TagProps {
  id: number;
  name: string;
}

export interface AdDetailsProps {
  id: number;
  title: string;
  description: string;
  owner: string;
  location: string;
  price: number;
  picture: string;
  createdAt: string;
  category: { name: string };
  tags: { name: string }[];
  updateAds: (bool: boolean) => void;
}

export interface AdDetailsPage {
  id: number;
  title: string;
  description: string;
  owner: string;
  location: string;
  price: number;
  picture: string;
  createdAt: string;
  category: CategoryProps;
  tags: TagProps[];
}

export interface CategoryContextProps {
  categories: CategoryProps[];
  updateCategories: () => void;
}

export interface CategoryProviderProps {
  children: ReactNode;
}

export interface BasketItem {
  id: number;
  price: number;
}

export interface BasketContextProps {
  basket: BasketItem[];
  toggleItemBasket: (item: BasketItem) => void;
  totalBasketPrice: number;
}

export interface BasketProviderProps {
  children: ReactNode;
}

export interface ButtonProps {
  label: string;
  onClickButton: () => void;
  stylesName: string;
}

export interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  required: boolean;
  error: any;
  type?: string;
  min?: number;
}

export interface SelectFieldProps {
  label: string;
  required: boolean;
  options: any;
  isMulti: boolean;
  value: any;
  onChange: any;
  error: any;
  control: any;
  name: string;
}

export interface TextAreaFieldProps {
  label: string;
  name: string;
  register: any;
  required: boolean;
}

export interface PostAd {
  data: AdCardProps;
  status: number;
}

export interface FormData {
  title: string;
  description?: string;
  owner: string;
  price: number;
  picture?: string;
  location: string;
  category: string;
  tags?: string[];
}

export interface OptionType {
  value: string;
  label: string;
}
