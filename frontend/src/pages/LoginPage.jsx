import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {

    const {setJwtToken, setRole} = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
        alert("Login successful!");


        setJwtToken(k => res.data.data.token);
        setRole(k => res.data.data.user.role);

        if(res.data.data.user.role==="system_admin"){
            navigate("/admin/dashboard");
        }
        else if(res.data.data.user.role==="normal_user"){
            navigate("/dashboard");
        }
        } catch (err) {
        console.error(err);
        alert("Login failed!");
        }
    };

    return (
        <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
        </div>
    );
}
