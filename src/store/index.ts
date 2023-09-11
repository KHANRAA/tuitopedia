import {configureStore, createSlice} from '@reduxjs/toolkit';
import faqSlices from "./slices/faqSlices";
import userSlices from "./slices/userSlices";

const store = configureStore({
    reducer: {
        faqs: faqSlices.reducer,
        user: userSlices.reducer

    }
})

export {store};
