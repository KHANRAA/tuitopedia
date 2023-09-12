import create from "zustand";


interface CategoryState {
    category: string;
    setCategory: (newCategory: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
    category: '',
    setCategory: (newCategory: string) => {
        set((state) => ({
            category: newCategory
        }));
    },
}));

export default useCategoryStore;
