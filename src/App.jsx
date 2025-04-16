import Applayout from "./Layouts/Applayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Onboarding from "./Pages/Onboarding";
import Myjobs from "./Pages/Myjob";
import ProtectedRoute from "./components/ProtectedRoutes";
import JobListing from "./Pages/JobListing";
import JobPage from "./Pages/Jobs";
import Savejobs from "./Pages/Savejobs";
import PostJob from "./Pages/PostJob";
// import PostJob from "./Pages/Postjob";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
            <Myjobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjobs", // ✅ Corrected path (previously might not match "/PostJob")
        element: (
          <ProtectedRoute>
            <PostJob/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/savejobs",
        element: (
          <ProtectedRoute>
            <Savejobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
