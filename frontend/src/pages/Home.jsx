import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";



export default function Home(){
    
    const navigate = useNavigate();

    const {role, jwtToken} = useAuth();

    useEffect(()=>{
        console.log("navigating");
        if(role==="system_admin" && jwtToken !== ""){
            navigate("/admin/home");
        }
        if(role==="normal_user" && jwtToken !== ""){
            navigate("/dashboard");
        }
        if(!role){
            navigate("/signup");
        }
    }, [role, jwtToken, navigate])

    return <div>
        redirecting...
    </div>
}