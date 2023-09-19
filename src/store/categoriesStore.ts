import create from "zustand";


interface CategoriesState {
    categories: string[];
    setCategories: (newCategory: string) => void;
}

const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: [],
    setCategories: (newCategory: string) => {
        set((state) => ({
            categories: Array.from(new Set([...state.categories, newCategory]))
        }));
    },
}));

export default useCategoriesStore;
