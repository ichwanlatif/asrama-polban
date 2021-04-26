import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Sidebar from './components/Navigation/Sidebar'
import Navbar from './components/Navigation/Navbar'

export const PrivateRoute = ({
    component:Component, ...rest})=>(
        <Route
        {...rest}
        render={props =>
            Cookies.get('cake') ?(
                <div>
                    <div id="wrapper">
                        <Sidebar />
                        <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar />
                            <div className="container-fluid">
                            <Component {...props}/> 
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
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