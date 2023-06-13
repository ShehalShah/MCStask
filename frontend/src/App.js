import React from 'react';
import Home from './pages/Home';
import Form from './components/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route element={<Home />} exact path="/" />
      <Route element={<Form />} exact path="/form" />
      </Routes>
    </Router>
  );
};

export default App;
