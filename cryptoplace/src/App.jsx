import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./Pages/Home/Home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  
    const navigate = useNavigate();
  
    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("Logged In");
          navigate("/");
        } else {
          console.log("Logged Out");
          navigate("/login");
        }
      });
    }, []);

  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
