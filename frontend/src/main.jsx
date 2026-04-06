import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Task from '../components/Task';
import ProtectedRoute from '../components/ProtectedRoute';


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/task" element={
          
            <Task />
        
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);