import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { email, password } = formData;
        // console.log(formData);
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            toast.error("Invalid email format");
            return false;
        }
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        // console.log(true);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await axios.post("http://127.0.0.1:5000/login", formData);
            console.log(res.data);
            
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("role", res.data.role);

            toast.success("Login successful!");

            // Redirect based on role
            if(res.data.role === 'admin') navigate('/admin-dashboard')
            else navigate('/user-dashboard')
            // navigate(res.data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-700">
            <div className="max-w-md w-full p-8 bg-gradient-to-r from-blue-300 to-blue-900 shadow-lg  rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </Button>
                </form>
            </div>

            {/* ✅ ToastContainer for showing toast messages */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Login;
