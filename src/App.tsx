// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import SingleEvent from "./pages/SingleEvent";

const AppContent: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  const hideHeaderAndFooter = location.pathname.includes("/dashboard");

  return (
    <>
      {!hideHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/*" element ={<SingleEvent/>} />
        <Route path="/company" element={<Company />} />
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      {!hideHeaderAndFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
