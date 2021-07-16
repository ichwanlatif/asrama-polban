import api from './api';
import {logOut} from './token'


export const logoutAuth = () => {
    api().post('api/logoutall').then(response => {
        if(response.data.status === "success"){
            logOut();
            window.location.assign("/")
        }
        else{
            console.log("error logout")
        }
    })
}