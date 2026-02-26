import { useAuth } from "./store/authStore";
import {Navigate, Outlet} from 'react-router-dom'

export function ProtectedRoute (){

    const {isAuthenticated, loading} = useAuth();

    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to={"/login-page"} replace/>
    return <Outlet/>

    return <div>Protected Route</div>

}