import * as React from 'react';
import Home from './home';
import Login from './login';
import { BrowserRouter as Router, Navigate , Route, Routes } from "react-router-dom";

export default function App() {

  const RequireAuth = ({ children }) => {
    let signedIn = sessionStorage.getItem('loggedInUser');
    if (!signedIn || signedIn == '') {
      return <Navigate to="/login" />;
    }
  
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
          } 
        />
    </Routes>
    </Router>
  );
}
