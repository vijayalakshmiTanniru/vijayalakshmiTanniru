import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/map/:cardId" element={<PrivateRoute> <MapView /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
