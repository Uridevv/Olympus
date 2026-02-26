import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCategories, addCategory, deleteCategory } from "../api/category";
import { Category } from "../types/categoryType";

interface CategoryContextType {
  categories: Category[];
  getAllCategories: () => Promise<{ data: Category[] } | undefined>;
  createCategory: (
    category: Omit<Category, "_id">
  ) => Promise<{ data: Category } | undefined>;
  removeCategory: (
    id: string
  ) => Promise<{ data: { message: string } } | undefined>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      if (res) setCategories(res.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const createCategory = async (category: Omit<Category, "_id">) => {
    try {
      const res = await addCategory(category);
      if (res) setCategories((prev) => [...prev, res.data]);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const removeCategory = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      if (res) setCategories((prev) => prev.filter((cat) => cat._id !== id));
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, getAllCategories, createCategory, removeCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
