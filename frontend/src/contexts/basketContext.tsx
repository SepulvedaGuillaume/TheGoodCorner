import { createContext, useState, ReactNode, useContext } from "react";
import type {
  BasketItem,
  BasketContextProps,
  BasketProviderProps,
} from "@/types";

const BasketContext = createContext<BasketContextProps | undefined>(undefined);

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const toggleItemBasket = (item: BasketItem) => {
    // Vérifier si l'article est déjà dans le panier
    const itemIndex = basket.findIndex(
      (basketItem) => basketItem.id === item.id
    );

    if (itemIndex !== -1) {
      // Si l'article est déjà dans le panier, le supprimer
      const updatedBasket = [...basket];
      updatedBasket.splice(itemIndex, 1);
      setBasket(updatedBasket);
    } else {
      // Sinon, ajouter l'article au panier
      setBasket((prevBasket) => [...prevBasket, item]);
    }
  };

  const totalBasketPrice = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <BasketContext.Provider
      value={{ basket, toggleItemBasket, totalBasketPrice }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext<BasketContextProps | undefined>(BasketContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
