import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import LoginComponent from "./components/Login/LoginComponent";
import ForgotPasswordComponent from "./components/Login/ForgotPasswordComponent";
import ChangePasswordComponent from "./components/Login/ChangePasswordComponent";
import OTPComponent from "./components/Login/OTPComponent";
import AddActorComponent from "./components/Actors/AddActorComponent";
import DoctorHomePage from "./components/HomePage/DoctorHomePage";
import ProfileComponent from "./components/Actors/ProfileComponent";
import AdminHomePage from "./components/HomePage/AdminHomePage"
import SupervisorHomePage from "./components/HomePage/SupervisorHomepage";
import AdminOperation from "./components/Actors/AdminOperation";
import ErrorPage from "./components/Error/ErrorPage";
import AddHealthWorker from "./components/Supervisor/AddHealthWorker";
import UpdateHealthWorker from "./components/HealthWorker/UpdateHealthWorker";
import UpdateHealthWorkerpage from "./components/UpdateHealthWorkerpage";
import PendingPatient from "./components/Doctor/PendingPatient";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import { AuthProvider } from "./components/Context/AuthContext";
import PatientDetails from "./components/Patient/PatientDetails";
import UpdateDeleteActor from "./components/Actors/UpdateDeleteActor";
import DoctorOperation from "./components/Doctor/DoctorOperation";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App font-[sans-serif]" >
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordComponent />}
          />
          <Route
            path="/change-password"
            element={
              // <PrivateRoute type="changepasswordcomponent">
                <ChangePasswordComponent />
              // </PrivateRoute>
            }
          />
          <Route path="/otp" element={<OTPComponent />} />
          <Route
            path="/add-doctor-supervisor"
            element={
              // <PrivateRoute type="addactorcomponent">
                <AddActorComponent />
              // </PrivateRoute>
            }
          />
          <Route
            path="/doctor-home"
            element={
              // <PrivateRoute type="doctorhomepage">
                <DoctorHomePage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/pendingpatient"
            element={
              // <PrivateRoute type="pendingpatient">
                <PendingPatient />
              // </PrivateRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              // <PrivateRoute type="doctor-dashboard">
                <DoctorHomePage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <PrivateRoute type="profilecomponent">
                <ProfileComponent />
              // </PrivateRoute>
            }
          />
          <Route
            path="/admin-home"
            element={
              // <PrivateRoute type="adminhomepage">
                <AdminHomePage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/supervisor-home"
            element={
              // <PrivateRoute type="supervisorhomepage">
                <SupervisorHomePage />
              // </PrivateRoute>
            }
          />
          {/* <Route
            path="/doctor-supervisor"
            element={
              <PrivateRoute type="adminoperation">
                <AdminOperation />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/update-doctor-supervisor"
            element={
              // <PrivateRoute type="update-doctor-supervisor">
                <UpdateDeleteActor />
              // </PrivateRoute>
            }
          />
          {/* <Route
            path="/healthworker-home"
            element={
              // <PrivateRoute type="healthworker">
                <AdminOperation />
              // </PrivateRoute>
            }
          /> */}
          <Route
            path="/add-healthworker"
            element={
              // <PrivateRoute type="add-healthworker">
                <AddHealthWorker />
              // </PrivateRoute>
            }
          />
          <Route
            path="/update-healthworker"
            element={
              // <PrivateRoute type="update-healthworker">
                <UpdateHealthWorker />
              // </PrivateRoute>
            }
          />
          <Route
            path="/delete-healthworker"
            element={
              // <PrivateRoute type="delete-healthworker">
                <AdminOperation />
              // </PrivateRoute>
            }
          />
          <Route
            path="/show-activity-healthworker"
            element={
              // <PrivateRoute type="show-activity-healthworker">
                <AdminOperation />
              // </PrivateRoute>
            }
          />
          <Route
            path="/update"
            element={
              // <PrivateRoute type="show-activity-healthworker">
                <UpdateHealthWorkerpage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/patient-details"
            element={
              // <PrivateRoute type="patient-details">
                <PatientDetails />
              // </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
