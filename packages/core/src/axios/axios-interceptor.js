import axios from 'axios';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN || ''
const APP_PORT = process.env.PORT || ''

let Axios = axios.create({
    baseURL: SERVER_DOMAIN,
    proxy: {
        host: 'localhost',
        port: 3301
    },
    withCredentials: false,
    crossDomain: true,
    crossOrigin: true
})

Axios.interceptors.request.use(
    requestConfig => {
        let token = LocalStorageSecurity.localStorageDecoder('auth-token') || '';
        requestConfig.headers.Authorization = token ? token : '';
        return requestConfig
    },
    error => {
        // return ApiError.errorHandler(error);
        throw error
    }
)

Axios.interceptors.response.use(
    response => {
        // TO STORE THE JWT TOKEN FROM RESPONSE
        return response;
    },
    error => {
        // return ApiError.errorHandler(error);
        throw error
    }
)
export default Axios
