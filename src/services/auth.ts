import User from "../entities/user";
import {AxiosRequestConfig} from 'axios';
import APIClient from "./api-client";

export const getTokenDuration = async () => {
    const storedExpirationDate: string = await JSON.parse(JSON.stringify(localStorage.getItem('expiration')));
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    return expirationDate.getTime() - now.getTime();

}

export const getAuthToken = async () => {
    const token = localStorage.getItem('tuitoPediaToken');
    console.log(token);

    if (!token) {
        console.log('returning null');
        return null;
    }

    const tokenDuration = await getTokenDuration();

    if (tokenDuration < 0) {
        localStorage.removeItem('tuitoPediaToken');
        localStorage.removeItem('currentUser');
        return null;
    }
    return token;
}

export const getAuthUser = async () => {
    const user: User = await JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user) {
        return null;
    }

    return user;
}


export function checkAuthLoader() {
    const token = getAuthToken();
    return token;

}


export function isLoggedInUser() {
    const token = checkAuthLoader();
    return token;

}


export const checkAdminLoader = async () => {
    console.log('Called ...');
    const user = await getAuthUser();
    console.log(user);

    if (!user || user.role !== 'admin') {
        throw new Error(`Invalid access`);
    }
    return user;
}


export const logOut = async () => {
    localStorage.removeItem('tuitoPediaToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expiration');
}


const apiClient = new APIClient<{ data: User }>('/auth');

export async function signUpRequest(signUpData: AxiosRequestConfig<any>) {
    return await apiClient.post('signup', {...signUpData});
}


export async function signInRequest(signInData: AxiosRequestConfig<any>) {
    return await apiClient.post('login', {...signInData});
}
