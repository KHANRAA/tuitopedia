import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";
import User from "../entities/user";


const apiClient = new APIClient<User>('/admin');


export async function getAllUsers(config: AxiosRequestConfig<any>) {
    return await apiClient.getAll(config);
}
