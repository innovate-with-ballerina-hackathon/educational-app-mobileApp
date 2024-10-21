import ax from 'axios';
import { BACKEND_URL } from '../helpers/constants';

const authAxios = ax.create({
    baseURL: BACKEND_URL
    });

authAxios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken'); //properly put the access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authAxios;