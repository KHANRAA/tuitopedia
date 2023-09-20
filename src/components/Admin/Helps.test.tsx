import React from 'react';
import {cleanup, screen, render, waitFor} from '@testing-library/react';
import Help from './Helps';
import "@testing-library/jest-dom";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import useUserStore from "../../store/userStore";
import User from "../../entities/user";


jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'), // Use the actual react-query module
    useQuery: jest.fn(),
}));

describe('HELP Tests', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });
    afterEach(cleanup)

    test('Tests HELP component! Rendered with data and admin', async () => {

        const user: User = {
            id: 'dummy',
            name: 'John',
            email: 'test',
            role: 'admin',
            isAdmin: true,
            isActive: true,
            avatarImageUrl: 'someUrl',
            tuitoPediaToken: 'dummmyToekn'

        };

        useUserStore.setState({user: user});


        (useQuery as jest.Mock).mockReturnValue({
            data: {
                data: [
                    {
                        "_id": "6509d841cd368c800d59d22d",
                        "name": "sascas",
                        "email": "ascac@asasc.com",
                        "isResponded": false,
                        "imageUrl": "someImageUrl",
                        "id": "6509d841cd368c800d59d22d"
                    },
                    {
                        "_id": "6509d8b5f16c4e66e2f4a7d5",
                        "name": "sascas",
                        "email": "ascac@asasc.com",
                        "isResponded": false,
                        "imageUrl": "someImageUrl",
                        "id": "6509d8b5f16c4e66e2f4a7d5"
                    },
                ]
            },
            isLoading: false,
            isError: false,
        });
        await render(<QueryClientProvider client={queryClient}><Help/></QueryClientProvider>);
        const linkElement = await screen.findByText('Help Requests', {exact: true});
        expect(linkElement).toBeInTheDocument();
    });
    test('Tests HELP component! Not Rendered even having data but not admin', async () => {

        const user: User = {
            id: 'dummy',
            name: 'John',
            email: 'test',
            role: 'user',
            isAdmin: true,
            isActive: true,
            avatarImageUrl: 'someUrl',
            tuitoPediaToken: ''

        };

        useUserStore.setState({user: user});


        (useQuery as jest.Mock).mockReturnValue({
            data: {
                data: [
                    {
                        "_id": "6509d841cd368c800d59d22d",
                        "name": "sascas",
                        "email": "ascac@asasc.com",
                        "isResponded": false,
                        "imageUrl": "someImageUrl",
                        "id": "6509d841cd368c800d59d22d"
                    },
                    {
                        "_id": "6509d8b5f16c4e66e2f4a7d5",
                        "name": "sascas",
                        "email": "ascac@asasc.com",
                        "isResponded": false,
                        "imageUrl": "someImageUrl",
                        "id": "6509d8b5f16c4e66e2f4a7d5"
                    },
                ]
            },
            isLoading: false,
            isError: false,
        });
        await render(<QueryClientProvider client={queryClient}><Help/></QueryClientProvider>);
        expect(screen.queryByText('Help Requests')).not.toBeInTheDocument();
    });

});
