import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import WordlistDashboard from "./pages/WordlistDashboard";
import WordlistEdit from "./pages/WordlistEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/base/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/wordlist/dashboard/:id"
          element={<WordlistDashboard />}
        ></Route>
        <Route path="/wordlist/edit/:id" element={<WordlistEdit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
