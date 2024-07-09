import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Suppliers from './components/Suppliers';
import Manufacturers from './components/Manufacturers';
import Buyers from './components/Buyers';
import Loans from './components/Loans';
import SupplierLoans from './components/SupplierLoans';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/suppliers" element={isAuthenticated ? <Suppliers /> : <Navigate to="/login" />} />
        <Route path="/manufacturers" element={isAuthenticated ? <Manufacturers /> : <Navigate to="/login" />} />
        <Route path="/buyers" element={isAuthenticated ? <Buyers /> : <Navigate to="/login" />} />
        <Route path="/loans" element={isAuthenticated ? <Loans /> : <Navigate to="/login" />} />
        <Route path="/supplierLoans" element={isAuthenticated ? <SupplierLoans /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
