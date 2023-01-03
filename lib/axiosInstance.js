import axios from 'axios';
import { helper } from './helper';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
    baseURL: baseUrl,
    //headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials: true,
    transformRequest: function (data, headers) {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            headers.Authorization = "Bearer " + access_token;
        }
        return data;
    },
    validateStatus: function (status) {
        if (status == 401) {
            helper.sweetalert.toast("Please Login");
            //window.location.assign("login");
        }
        return (status >= 200 && status <= 204);
    }
});

export default axiosInstance;
