import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";
import User from "../entities/user";


const apiClient = new APIClient<User>('/auth');


export async function getAllUsers(config: AxiosRequestConfig<any>) {
    return await apiClient.getAll(config);
}
