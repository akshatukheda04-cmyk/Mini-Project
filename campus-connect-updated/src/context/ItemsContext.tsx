import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/data/types";
import { items as initialItems } from "@/data/mock-data";

interface ItemsContextType {
  items: Item[];
  addItem: (item: Item) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const addItem = (item: Item) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const ctx = useContext(ItemsContext);
  if (!ctx) throw new Error("useItems must be used within ItemsProvider");
  return ctx;
};
