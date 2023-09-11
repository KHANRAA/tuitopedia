import {createSlice} from "@reduxjs/toolkit";
import Faq from "../../entities/faq";


const faqSlices = createSlice({
    name: "faqs",
    initialState: [],
    reducers: {
        addFaq: (state: Faq[], action) => {
            state.push(action.payload);
        },
        removeFaq: (state: Faq[], action: { payload: Faq }) => {
            const id = action.payload.id;
            state.filter((faq) => faq.id === id);
        },
        reset: (state: Faq[], action: { payload: Faq }) => {
            return [];
        }
    }

});

export default faqSlices;

export const {addFaq, removeFaq, reset} = faqSlices.actions;
