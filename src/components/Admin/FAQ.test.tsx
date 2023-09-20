import React from 'react';
import {cleanup, screen, render} from '@testing-library/react';
import FAQ from './FAQ';
import "@testing-library/jest-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

afterEach(cleanup);
describe('FAQ Tests', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });
    test('Tests FAQ component!', async () => {
        render(<QueryClientProvider client={queryClient}><FAQ/></QueryClientProvider>)
        const linkElement = await screen.findByText('Add new FAQ', {exact: false});
        expect(linkElement).toBeInTheDocument();
    });

});
