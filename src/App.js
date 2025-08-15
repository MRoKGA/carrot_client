import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import LocationSelect from './pages/LocationSelect';
import PhoneNumberInput from './pages/PhoneNumberInput';
import Home from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import ServicesPage from './pages/ServicesPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/location" element={<LocationSelect />} />
        <Route path="/phone" element={<PhoneNumberInput />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/news" element={<NotificationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
