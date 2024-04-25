import "./App.css";
import EventList from "./components/EventList";
import Header from "./components/header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
