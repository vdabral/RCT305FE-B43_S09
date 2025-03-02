import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CountrySearch from "./components/CountrySearch";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<CountrySearch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
