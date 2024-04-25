import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Website/Home.js";
import LoginUser from "./Pages/Auth/LoginUser";
import LoginAdmin from "./Pages/Auth/LoginAdmin";
import Register from "./Pages/Auth/RegisterUser";
import User from "./Pages/Dashboard/User.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import Authrequired from "./Pages/Auth/Authrequired.js";
import UserProfile from "./Pages/Dashboard/UserProfile";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* public Route */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/loginUser" element={<LoginUser />}></Route>
        <Route path="/loginAdmin" element={<LoginAdmin />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* protected Route */}
        <Route element={<Authrequired />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<User />}></Route>
            <Route path="userProfile/:id" element={<UserProfile />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
