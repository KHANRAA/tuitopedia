import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react'
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {store} from "./store";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./services/api-client";
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
