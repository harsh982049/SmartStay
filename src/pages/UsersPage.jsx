import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try
            {
                const response = await axios.get("http://127.0.0.1:5000/users");
                setUsers(response.data);
            }
            catch(error)
            {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            // console.log(formData);
            const response = await axios.post("http://127.0.0.1:5000/users", formData);
            console.log("User added:", response.data);
            setUsers((prev) => [...prev, response.data]); // Add new user to the list
            setFormData({username: "", email: "", password: ""}); // Reset form
        }
        catch(error)
        {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div>
        <h1>Users: </h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                {user.username} ({user.email})
            </li>
            ))}
        </ul>

        <h2>Add User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-1/2 text-black">
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            />
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <Button type="submit">Add User</Button>
            {/* <button type="submit" className="text-white">Add User</button> */}
        </form>
        </div>
    );
};

export default UsersPage;
