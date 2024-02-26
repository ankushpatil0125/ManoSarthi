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
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordComponent/>}/>
          <Route path="/change-password" element={<ChangePasswordComponent/>}/>
          <Route path="/otp" element={<OTPComponent/>}/>
          <Route path="/add-doctor-supervisor" element={<AddActorComponent/>}/>
          <Route path="/doctor-home" element={<DoctorHomePage/>}/>
          <Route path="/doctor-profile" element={<ProfileComponent/>}/> 
          <Route path="/admin-home" element={<AdminHomePage/>}/>
          <Route path="/supervisor-home" element={<SupervisorHomePage/>}/>
          <Route path="/doctor-supervisor" element={<AdminOperation/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
