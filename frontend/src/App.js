import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

import UserDashboard from "./pages/UserDashboard";
import WordlistDashboard from "./pages/WordlistDashboard";
import WordlistEdit from "./pages/WordlistEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/base/Navbar";
import Practice from "./pages/Practice";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const { user } = useAuthContext();

  // makes sure that we check if the user is logged in, only if the user is logged in can be
  useEffect(() => {
    setLoggedIn(Boolean(user));
  }, []);

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      {loggedIn !== null && (
        <Routes>
          <Route
            path="/"
            element={user ? <UserDashboard /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/wordlist/dashboard/:id"
            element={!user ? <Navigate to="/login" /> : <WordlistDashboard />}
          ></Route>
          <Route
            path="/wordlist/edit/:id"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : user.type !== "user" ? (
                <WordlistEdit />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          ></Route>
          <Route
            path="/practice/:id/:word_id"
            element={user ? <Practice /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
