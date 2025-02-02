import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Singup from "./components/SingUp";
import { Toaster } from "react-hot-toast";
import { Context } from "./main";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<Singup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;