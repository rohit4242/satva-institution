import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import TeacherDashboard from "./Pages/TeacherDashboard/Dashboard"
import StudentDashboard from "./Pages/StudentDashboard/Dashboard"
import { UserAuthContextProvider } from "./Context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from "./PrivateRouter";
import './App.css';


function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/TeacherDashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/StudentDashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
