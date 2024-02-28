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
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/forgot-password" element={<PrivateRoute> <ForgotPasswordComponent/> </PrivateRoute>}/>
          <Route path="/change-password" element={<PrivateRoute><ChangePasswordComponent/> </PrivateRoute>}/>
          <Route path="/otp" element={<PrivateRoute><OTPComponent/> </PrivateRoute>}/>
          <Route path="/add-doctor-supervisor" element={<PrivateRoute><AddActorComponent/></PrivateRoute>}/>
          <Route path="/doctor-home" element={<PrivateRoute><DoctorHomePage/></PrivateRoute>}/>
          <Route path="/doctor-profile" element={<PrivateRoute><ProfileComponent/></PrivateRoute>}/> 
          <Route path="/admin-home" element={<PrivateRoute><AdminHomePage/></PrivateRoute>}/>
          <Route path="/supervisor-home" element={<PrivateRoute><SupervisorHomePage/></PrivateRoute>}/>
          <Route path="/doctor-supervisor" element={<PrivateRoute><AdminOperation/></PrivateRoute>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
