import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
});

const handleChange = (e) => {
    setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSignup = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/signup", formData);
    alert("Signup successful!");
    navigate("/login");
    } catch (err) {
    console.error(err);
    alert("Signup failed!");
    }
};

return (
    <div className="signup">
    <h2>Signup</h2>
    <form onSubmit={handleSignup}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
    </form>
    </div>
);
}
