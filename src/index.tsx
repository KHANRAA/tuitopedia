import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react'
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./services/api-client";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
                <ReactQueryDevtools initialIsOpen={true}/>
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
