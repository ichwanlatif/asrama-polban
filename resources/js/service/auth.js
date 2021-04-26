import api from './api';
import {logIn, logOut, notLoggedIn} from './token'



export const loginAuth = (props) => {
    api().get('/sanctum/csrf-cookie').then(() => {
        api().post('api/login', props).then(response => {
            if(response.data.status !== 200){
                console.log(response.data.message)
                notLoggedIn;
            }
            else{
                logIn(response.data.token);
                localStorage.setItem('user_id', response.data.data.id);
                localStorage.setItem('user_role', response.data.data.pengurus_jabatan);
                window.location.assign('/#/dashboard');
            }
        })
    })
}

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