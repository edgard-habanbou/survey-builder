import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingUser from "./pages/User/LandingUser";
import LandingAdmin from "./pages/Admin/LandingAdmin";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<LandingUser />} />
          <Route path="/landing-admin" element={<LandingAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
