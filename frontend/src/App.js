import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./IT20600884/dashboard";
import AllDoctors from "./IT20600884/Doctor/AllDoctors";
import AllMasters from "./IT20600884/Master/AllMasters";
import HomePage from "./IT20620202/UserView/home";
import LoginUser from "./IT20620202/UserView/login";
import SignUpUser from "./IT20620202/UserView/signin";
import Sidebar from "./IT20603236/UserDashboard";
import AllRequests from "./IT20603236/Requests/Requests";
import BloodCount from "./IT20600884/BloodCount/BloodCount";
import MyRequests from "./IT20603236/MyRequests/MyRequests";
import DoctorLogin from "./IT20600884/Doctor/login";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<LoginUser />} />
          <Route path="/loginsample" exact element={<LoginUser />} />
          <Route path="/signin" exact element={<SignUpUser />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/doctors" exact element={<AllDoctors />} />
          <Route path="/masters" exact element={<AllMasters />} />
          <Route path="/teachers02" exact element={<AllMasters />} />
          <Route path="/students" exact element={<AllMasters />} />
          <Route path="/teachers" exact element={<AllMasters />} />
          <Route path="/user-dashboard" exact element={<Sidebar/>} />
          <Route path="/requests" exact element={<AllRequests/>} />
          <Route path="/doctors" exact element={<AllDoctors />} />
          <Route path="/blood-count" exact element={<BloodCount/>} />
          <Route path="/my-requests" exact element={<MyRequests/>} /> 
          <Route path="/doctor-login" exact element={<DoctorLogin/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
