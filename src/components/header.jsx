import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { jwtDecode } from "jwt-decode";

const Header = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	// Get user role from JWT token
	let role = null;
	if (token) {
		try {
			const decoded = jwtDecode(token);
			role = decoded.role; // Extract role from token
		} catch (error) {
			console.error("Invalid token", error);
			localStorage.removeItem("token"); // Clear invalid token
			role = null;
		}
	}

	// Handle Dashboard Navigation Based on Role
	const handleDashboardClick = () => {
		if (role === "admin") {
			navigate("/admin-dashboard");
		} else {
			navigate("/user-dashboard");
		}
	};

	return (
		<>
			<nav className="py-4 flex justify-between items-center">
				<Link to="/">
					<img src="/logo.png" className="h-20" alt="Logo" />
				</Link>

				{/* Show Login button if not logged in */}
				{!token ? (
					<Link to="/login">
						<Button variant="outline">Login</Button>
					</Link>
				) : (
					<Button variant="outline" onClick={handleDashboardClick}>
						Dashboard
					</Button>
				)}
			</nav>
		</>
	);
};

export default Header;
