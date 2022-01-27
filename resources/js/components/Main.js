import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';

import SignIn from './SignIn';
import Dashboard from './contents/Dashboard';
import MainContent from './layouts/MainContent';

function Main() {
    return (
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </div>
    );
}

export default Main;
