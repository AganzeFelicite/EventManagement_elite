import { useContext, useEffect, useState } from "react";
import "./App.css";
import EventList from "./components/EventList";
import UserLogin from "./components/Login";
import Header from "./components/header";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Signup from "./components/signup";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { userInfo, logout } = useContext(AuthContext);
  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, [userInfo]);
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <UserLogin /> : <Navigate to="/events" />}
          />
          <Route
            path="/events"
            element={!isLoggedIn ? <UserLogin /> : <EventList />}
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}
