import api from './api';
import {logIn, logOut, notLoggedIn} from './token'



export const loginAuth = (props) => {
    api().get('/sanctum/csrf-cookie').then(() => {
        api().post('api/login', props).then(response => {
            if(response.data.status !== 200){
                console.log(response.data.message)
                // notLoggedIn;
            }
            else{
                localStorage.setItem('user_role', response.data.data.role);
                logIn(response.data.token);
                // alert(response.data.data.role)
                if(response.data.data.role === '1'){
                    var endPoint = "api/mahasiswaByUser/" + response.data.data.id;
                }
                else if(response.data.data.role === '2'){
                    var endPoint = "api/pengurusKoorByUser/" + response.data.data.id;
                }
                else if(response.data.data.role === '3'){
                    var endPoint = "api/pengurusKomdisByUser/" + response.data.data.id;
                }
                else{
                    var endPoint = "api/manajemenByUser/" + response.data.data.id;
                }
                alert(endPoint)
                api().get(endPoint).then(User => {
                    if(User.data.status !== 200){
                        alert(User.data.message)
                    }
                    else{
                        localStorage.setItem('user_id', User.data.data.id);
                    }
                })
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