import React from "react";
import { Routes, Route, Outlet } from "react-router-dom"; // Add Outlet here

// user imports
import Home from "./pages/user/Home.jsx";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";
import ServiceDetails from "./pages/user/ServiceDetails.jsx";
import FullServices from './components/FullServices.jsx'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Admin imports

// Common imports
import NotFound from "./pages/NotFound.jsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col"> 
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Routes WITHOUT Navbar and Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />

      {/* Routes WITH Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/services" element={<FullServices />} />
      </Route>

      {/* Admin routes can go here later */}
      
    </Routes>
  );
}

export default App;