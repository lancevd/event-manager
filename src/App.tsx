// src/App.tsx
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const menu = [
    {
      path: "/",
      item: <Home />,
    },
    {
      path: "/company",
      item: <Company />,
    },
    {
      path: "/login",
      item: <Login />,
    },
    {
      path: "register",
      item: <Register />,
    },
    {
      path: "dashboard",
      item: <Dashboard />,
    },
  ];
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        {
          menu.map((item: any, index: number)=>{
            return <Route key={index} path={item.path} element={item.item} />
          })
        }
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
