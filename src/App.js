import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import LocationSelect from './pages/LocationSelect';
import PhoneNumberInput from './pages/PhoneNumberInput';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/location" element={<LocationSelect />} />
        <Route path="/phone" element={<PhoneNumberInput />} />
        {/* 필요 시 로그인 화면도 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;
