import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // ✅ Correct

// Get user role from JWT
const getUserRole = () => {
    const token = localStorage.getItem("token");
    console.log('Inside auth');
    if (!token) return null;
    

    try {
        const decoded = jwtDecode(token);
        return decoded.role; // Role stored in JWT
    } catch (error) {
        return null;
    }
};

export const RequireAuth = ({ allowedRoles }) => {
    const role = getUserRole();
    console.log(role);
    
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
