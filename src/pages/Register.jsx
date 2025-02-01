import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contact: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { username, email, contact, password, role } = formData;

        if (!username || username.length < 3) {
            toast.error("Username must be at least 3 characters long");
            return false;
        }
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            toast.error("Invalid email format");
            return false;
        }
        if (!contact.match(/^[0-9]{10}$/)) {
            toast.error("Contact must be a 10-digit number");
            return false;
        }
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        if (!role) {
            toast.error("Please select a role");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post("http://127.0.0.1:5000/register", formData);
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-700">
            <div className="max-w-md w-full p-8 bg-gradient-to-r from-blue-300 to-blue-900 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500"
                        />
                    </div>

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

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <Input
                            type="text"
                            name="contact"
                            value={formData.contact}
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

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Role</label>
                        <div className="relative mt-1">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="block w-full appearance-none border border-gray-600 bg-black text-white px-4 py-2 pr-8 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            >
                                <option value="" className="text-gray-400">Select a role</option>
                                <option value="user" className="text-white">User</option>
                                <option value="admin" className="text-white">Admin</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </Button>
                </form>
            </div>

            {/* ✅ ToastContainer for showing toast messages */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Register;
