import { useAuth } from "./store/authStore";
import {Navigate, Outlet} from 'react-router-dom'

export function ProtectedRoute (){

    const {isAuthenticated, loading, user} = useAuth();

    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to={"/login-page"} replace/>
    if(user?.role === "admin" || user?.role === "manager") return <Navigate to={"/admin"} replace/>
    return <Outlet/>

}