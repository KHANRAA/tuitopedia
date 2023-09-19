import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";

import Help, {HelpRequest} from "../entities/help";


const apiClient = new APIClient<{ data: HelpRequest }>('/contact');

export async function addHelpRequest(helpData: AxiosRequestConfig<any>) {
    return await apiClient.post('add', {...helpData});
}

const apiClientGetRequest = new APIClient<Help>('/contact');

export async function hetAllHelps(config: AxiosRequestConfig<any>) {
    return await apiClientGetRequest.getAll(config);
}


export async function updateAdminResponded(updateData: AxiosRequestConfig<any>) {
    return await apiClient.put('respond', {...updateData});
}
