import { useEffect, useState } from "react";


const useAuth = () =>{
    const [jwtToken, setJwtToken] = useState(()=> localStorage.getItem('jwtToken') || "");
    const [role, setRole] = useState(() => localStorage.getItem('role') || "");

    useEffect(() =>{
        if(jwtToken){
            localStorage.setItem('jwtToken', jwtToken);
        }
        else{
            localStorage.removeItem('jwtToken');
        }

        if(role){
            localStorage.setItem('role', role);
        }
        else{
            localStorage.removeItem('role');
        }
    }, [jwtToken, role]);

    return {jwtToken, setJwtToken, role, setRole};
}

export default useAuth;