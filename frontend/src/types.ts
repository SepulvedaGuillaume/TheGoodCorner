import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface Ad {
  id: string;
  title: string;
  description?: string | null;
  owner: string;
  price: number;
  picture?: string | null;
  location: string;
  createdAt?: any;
  category: Category;
  tags: Tag[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface AdCardProps {
  id: string;
  title: string;
  price: number;
  picture?: string | null;
  description?: string | null;
  updateAds: () => void;
}

export interface CategoryProps {
  id: string;
  name: string;
}

export interface TagProps {
  id: string;
  name: string;
}

export interface AdDetailsProps {
  id: string;
  title: string;
  description?: string | null;
  owner: string;
  location: string;
  price: number;
  picture?: string | null;
  createdAt?: string | null;
  category: {
    id?: string;
    name: string;
  };
  tags: {
    id?: string;
    name: string;
  }[];
  updateAds: (bool: boolean) => void;
}

export interface AdDetailsPage {
  id: string;
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
  id: string;
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
  id: string;
  value: string;
  label: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
