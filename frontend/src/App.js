import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
    const [token, setToken] = useState("");

    const hasToken = !!token;

    return (
        <div className="App" style={{widht: '100%', height: '100vh', display: "flex", flexDirection: 'column'}}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login setToken={setToken}/>} />
                <Route path="/login" element={<Login setToken={setToken}/>} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        hasToken ? (
                            <Dashboard token={token} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
