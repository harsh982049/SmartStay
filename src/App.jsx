import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
// import {Button} from './components/ui/button';
import LandingPage from './pages/LandingPage';
import UiVerse from './pages/UiVerse';
import AppLayout from './layouts/app-layout';
import {ThemeProvider} from './components/theme-provider';
import UsersPage from './pages/UsersPage';
import UserDashboard from './pages/UserDashboard';
import MyBookingsPage from './pages/MyBookingsPage';
import LoyaltyPointsPage from './pages/LoyaltyPointsPage';
import UserProfilePage from './pages/UserProfilePage';
import { UserDashboardLayout } from './layouts/UserDashboardLayout';
import HotelDetailPage from './pages/HotelDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequireAuth } from "./components/RequireAuth";
import AdminDashboard from './pages/AdminDashboard';
// import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
	{
		element: <AppLayout/>,
		children: [
			{
				path: '/',
				element: <LandingPage/>
			},
			
			{
				path: '/crazy-ui',
				element: <UiVerse/>
			},
			{
				path: '/users',
				element: <UsersPage/>
			}
		]
	},
	{
		path: "/user-dashboard",
		element: <UserDashboardLayout/>, // Sidebar applies to all child routes
		children: [
		  {
			path: "/user-dashboard",
			element: <UserDashboard/>
		  },
		  {
			path: "/user-dashboard/hotel/:id",
			element: <HotelDetailPage/>
		  },
		  {
			path: "/user-dashboard/bookings",
			element: <MyBookingsPage/>,
		  },
		  {
			path: "/user-dashboard/loyalty-points",
			element: <LoyaltyPointsPage/>,
		  },
		  {
			path: "/user-dashboard/profile",
			element: <UserProfilePage/>,
		  },
		],
	},
	{
		path: "/admin-dashboard",
		element: <AdminDashboard/>
		// element: <RequireAuth allowedRoles={["admin"]} />, // ✅ Protect admin routes
		// children: [
		// 	{
		// 		path: "/admin-dashboard",
		// 		element: <AdminDashboard/>, // Replace with actual Admin component
		// 	},
		// 	{
		// 		path: "/admin-dashboard/manage-users",
		// 		element: <div>Manage Users</div>, // Replace with actual component
		// 	},
		// ],
	},
	{ path: "/login", element: <Login/> },
  	{ path: "/register", element: <Register/> },
]);

function App() {
	return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<RouterProvider router={router}/>
    </ThemeProvider>
}

export default App;
