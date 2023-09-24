import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";
import Faq, {FaqRequest} from "../entities/faq";


const apiClient = new APIClient<{ data: FaqRequest }>('/faq');

export async function addFaqRequest(faqData: AxiosRequestConfig<any>) {
    return await apiClient.post('add', {...faqData});
}


export async function updateFAQ(faqData: AxiosRequestConfig<any>) {
    return await apiClient.put('update', {...faqData});
}


const apiClientGetRequest = new APIClient<Faq>('/faq');

export async function getFaqs(config: AxiosRequestConfig<any>) {
    return await apiClientGetRequest.getAll(config);
}
