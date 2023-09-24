import axios, {AxiosInstance, AxiosRequestConfig} from "axios";


interface ResponseSchema<T> {
    status: number,
    data: T[]

}

const getToken = async () => {
    return await localStorage.getItem('tuitoPediaToken') || '';
}


const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://intuitopedia-backend-214448b64703.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json',
    }

});


class APIClient<T> {
    endPoint: string;

    constructor(endpoint: string) {
        this.endPoint = endpoint;
    }

    getAll = (async (config: AxiosRequestConfig) => {
        let token = await getToken();
        return axiosInstance.get<ResponseSchema<T>>(this.endPoint + '/all', {...config, headers: {...config.headers, 'tuitopediatoken': token}})
            .then((res) => res.data);
    })
    post = async (path: string, config: AxiosRequestConfig) => {
        let token = await getToken();
        const res = await axiosInstance
            .post<T>(this.endPoint + '/' + path, config, {...config, headers: {...config.headers, 'tuitopediatoken': token}});
        return res.data;
    };
    put = async (path: string, config: AxiosRequestConfig) => {
        let token = await getToken();
        const res = await axiosInstance
            .put<T>(this.endPoint + '/' + path, config, {...config, headers: {...config.headers, 'tuitopediatoken': token}});
        return res.data;
    };
    delete = async (path: string, config: AxiosRequestConfig) => {
        let token = await getToken();
        const res = await axiosInstance
            .delete<T>(this.endPoint + '/' + path, {...config, headers: {...config.headers, 'tuitopediatoken': token}});
        return res.data;
    };
}

export default APIClient;
