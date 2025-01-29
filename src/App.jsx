import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
// import {Button} from './components/ui/button';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import JobPage from './pages/JobPage';
import PostJob from './pages/PostJob';
import SavedJobs from './pages/SavedJobs';
import MyJobs from './pages/MyJobs';
import JobListing from './pages/JobListing';
import UiVerse from './pages/UiVerse';
import AppLayout from './layouts/app-layout';
import {ThemeProvider} from './components/theme-provider';
import UsersPage from './pages/UsersPage';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
	{
		element: <AppLayout/>,
		children: [
			{
				path: '/',
				element: <LandingPage/>
			},
			{
				path: '/onboarding',
				element: <RequireAuth><Onboarding/></RequireAuth>
			},
			{
				path: '/jobs',
				element: <JobListing/>
			},
			{
				path: '/job/:id',
				element: <JobPage/>
			},
			{
				path: '/post-job',
				element: <PostJob/>
			},
			{
				path: '/saved-job',
				element: <SavedJobs/>
			},
			{
				path: '/my-jobs',
				element: <MyJobs/>
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
	}
]);

function App() {
	return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<RouterProvider router={router}/>
    </ThemeProvider>
}

export default App;
