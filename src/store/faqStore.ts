import create from "zustand";

import Faq from "../entities/faq";

interface FaqState {
    faqs: Faq[];
    addFaq: (newFaq: Faq[]) => void;
    removeFaq: (id: string) => void;
}

const useFaqStore = create<FaqState>((set) => ({
    faqs: [],
    addFaq: (newFaqs: Faq[]) => {
        set((state) => ({
            faqs: [...newFaqs],
        }));
    },
    removeFaq: (id) => {
        set((state) => ({
            faqs: state.faqs.filter((eachFaq) => eachFaq.id === id),
        }));
    }
}));

export default useFaqStore;
