import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {QueryClient} from "@tanstack/react-query";
export const queryClient = new QueryClient();

interface ResponseSchema<T> {
    status: number,
    data: T[]

}


const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4200/api',
    headers: {
        tuitopediatoken: localStorage.getItem('tuitoPediaToken') || '',
        'Content-Type': 'application/json',
    }

});


class APIClient<T> {
    endPoint: string;

    constructor(endpoint: string) {
        this.endPoint = endpoint;
    }

    getAll = ((config: AxiosRequestConfig) => {
        return axiosInstance.get<ResponseSchema<T>>(this.endPoint + '/all', config)
            .then((res) => res.data);
    })
    post = async (path: string, config: AxiosRequestConfig) => {
        const res = await axiosInstance
            .post<T>(this.endPoint + '/' + path, config);
        return res.data;
    };
}

export default APIClient;
