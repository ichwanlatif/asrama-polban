import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

export const MahasiswaRoute = ({
    component:Component, ...rest})=>(
        <Route
        {...rest}
        render={props =>
            Cookies.get('cake') && (localStorage.getItem("user_role") == 1) ?(
                <Component {...props}/>
            ):(
                <Redirect
                to={{
                    pathname:"/",
                    state:{
                        from:props.location
                    }
                }}
            />
            )
        }
        />
    )