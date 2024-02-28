import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import LoginComponent from "./components/LoginComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent";
import OTPComponent from "./components/OTPComponent";
import AddActorComponent from "./components/AddActorComponent";
import DoctorHomePage from "./components/DoctorHomePage";
import ProfileComponent from "./components/ProfileComponent"
import AdminHomePage from "./components/AdminHomePage"
import SupervisorHomePage from "./components/SupervisorHomepage";
import AdminOperation from "./components/AdminOperation";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./components/ErrorPage";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordComponent/>}/>
          <Route path="/change-password" element={<PrivateRoute type="changepasswordcomponent"><ChangePasswordComponent/> </PrivateRoute>}/>
          <Route path="/otp" element={<OTPComponent/>}/>
          <Route path="/add-doctor-supervisor" element={<PrivateRoute type="addactorcomponent"><AddActorComponent/></PrivateRoute>}/>
          <Route path="/doctor-home" element={<PrivateRoute type="doctorhomepage"><DoctorHomePage/></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute type="profilecomponent"><ProfileComponent/></PrivateRoute>}/> 
          <Route path="/admin-home" element={<PrivateRoute type="adminhomepage"><AdminHomePage/></PrivateRoute>}/>
          <Route path="/supervisor-home" element={<PrivateRoute type="supervisorhomepage"><SupervisorHomePage/></PrivateRoute>}/>
          <Route path="/doctor-supervisor" element={<PrivateRoute type="adminoperation"><AdminOperation/></PrivateRoute>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
