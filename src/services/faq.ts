import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";
import Faq, {FaqRequest} from "../entities/faq";


const apiClient = new APIClient<{ data: FaqRequest }>('/faq');
const apiClientGetRequest = new APIClient<Faq>('/faq');

const apiClientUpdateRequest = new APIClient<{ data: Faq }>('/faq');

export async function addFaqRequest(faqData: AxiosRequestConfig<any>) {
    return await apiClient.post('add', {...faqData});
}

export async function updateFaqRequest(faqData: AxiosRequestConfig<any>) {
    return await apiClientUpdateRequest.put('update', {...faqData});
}

export async function getFaqs(config: AxiosRequestConfig<any>) {
    return await apiClientGetRequest.getAll(config);
}
