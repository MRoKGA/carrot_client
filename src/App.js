import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import LocationSelect from './pages/LocationSelect';
import PhoneNumberInput from './pages/PhoneNumberInput';
import Home from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import ServicesPage from './pages/ServicesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ChatPage from './pages/ChatPage';
import VerifyCode from './pages/VerifyCode';
import ProfileEdit from './pages/ProfileEdit';
import LoginPhone from './pages/LoginPhone';
import LoginVerify from './pages/LoginVerify';

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
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/login" element={<LoginPhone />} />
        <Route path="/login/verify" element={<LoginVerify />} />
      </Routes>
    </Router>
  );
}

export default App;
