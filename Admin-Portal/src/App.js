import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import PageNotFound from "./components/admin/PageNotFound";
import Login from "./components/home/Login";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
