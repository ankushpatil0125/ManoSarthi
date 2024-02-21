import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// import Header from "./components/Header";

import LoginComponent from "./components/LoginComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent";
import OTPComponent from "./components/OTPComponent";
import AddDoctorComponent from "./components/AddDoctorComponent";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordComponent/>}/>
          <Route path="/change-password" element={<ChangePasswordComponent/>}/>
          <Route path="/otp" element={<OTPComponent/>}/>
          <Route path="/add-doctor" element={<AddDoctorComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
