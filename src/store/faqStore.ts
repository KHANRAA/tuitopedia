import {create} from "zustand";

import Faq from "../entities/faq";

interface FaqState {
    faqs: Faq[];
    addFaq: (newFaq: Faq[]) => void;
    updateFaq: (faq: Faq) => void;
    removeFaq: (id: string) => void;
}

const useFaqStore = create<FaqState>((set) => ({
    faqs: [],
    addFaq: (newFaqs: Faq[]) => {
        set((state) => ({
            faqs: [...newFaqs],
        }));
    },
    updateFaq: (newFaq: Faq) => {
        set((state) => ({
            faqs: state.faqs.map((eachFaq) => {
                if (eachFaq.id === newFaq.id) {
                    eachFaq.isActive = newFaq.isActive;
                    eachFaq.imageUrl = newFaq.imageUrl;
                    eachFaq.title = newFaq.title;
                    eachFaq.content = newFaq.content;
                    eachFaq.category = newFaq.category

                }
                return eachFaq;
            })
        }));
    },
    removeFaq: (id) => {
        set((state) => ({
            faqs: state.faqs.filter((eachFaq) => eachFaq.id === id),
        }));
    }
}));

export default useFaqStore;
