import axios from "axios";
import Cookies from 'js-cookie';
import { cekLog } from "./token";


export default function api(){
    axios.defaults.headers.common['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');

    if(cekLog){
        const token = Cookies.get('cake');
        const api = axios.create({
            baseURL: 'https://asrama-polban.xyz/public/',
            // baseURL: 'http://127.0.0.1:8000/',
            withCredentials: true,
            headers:{'Authorization':'Bearer '+token}
        });
        return api
    }
    else{
        const api = axios.create({
            baseURL: 'https://asrama-polban.xyz/public/',
            // baseURL: 'http://127.0.0.1:8000/',
            withCredentials: true,
        });
        return api
    }
}