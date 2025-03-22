import Applayout from "./Layouts/Applayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Onboarding from "./Pages/Onboarding";
import Myjobs from "./Pages/Myjob";
// import JobsPage from "./Pages/Jobs";
import PostJob from "./Pages/Postjob";
// import Savejobs from "./Pages/Savejobs";
import ProtectedRoute from "./components/ProtectedRoutes";
import Joblisting from "./Pages/Joblisting";
import JobPage from "./Pages/Jobs";
import Savejobs from "./Pages/Savejobs";

const router = createBrowserRouter([
  {
    element: <Applayout/>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />,
          </ProtectedRoute>
        )
      },

      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <Joblisting/>,
          </ProtectedRoute>
        )
       
      },

      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
          <Myjobs/>,
          </ProtectedRoute>
        )
        
      },

      {
        path: "/job/:id", 
        element: (
          <ProtectedRoute>
            <JobPage/>,
          </ProtectedRoute>
        )
        
      },
      {
        path: "/postjobs",
        element: (
          <ProtectedRoute>
            <PostJob />,
          </ProtectedRoute>
        )
        
      },
      {
        path: "/savejobs",
        element: (
          <ProtectedRoute>
            <Savejobs/>,
          </ProtectedRoute>
        )
        
      },
    ],
  },
]);

function App() {
  return (

  <RouterProvider router={router} />
    
  );
}

export default App;
