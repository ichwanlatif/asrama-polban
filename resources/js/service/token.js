import Cookies from "js-cookie"
import cookie from 'cookie'
import { Redirect } from "react-router-dom"


export const isLoggedIn = (reqCookies = null) => {
    if(!reqCookies){
        return !! Cookies.get('cake')
    }

    return !! cookie.parse(reqCookies).cake
}

export const logIn = (props) => {
    Cookies.set('cake', props, {expires: 86400, sameSite: 'lax'})
}

export const logOut = () => {
    if(typeof window !== 'undefined'){
        Cookies.remove('cake', {expires:86400, sameSite: 'lax'})
        localStorage.clear();
        return <Redirect to='/' />
    }

}

export const notLoggedIn = () => {
    return <Redirect to='/' />
}

export const cekLog = () => {
    const status = Cookies.get('cake');
    if(status == null){
        return false
    }
    return true
}