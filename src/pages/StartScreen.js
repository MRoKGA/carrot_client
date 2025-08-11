import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/startscreen.css';
import logo from '../assets/images/carrotmarketlogo.png';

const StartScreen = () => {
  const navigate = useNavigate();

  // 🔄 /location으로 이동
  const handleStart = () => {
    navigate('/location');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="start-wrapper">
      <div className="content">
        <img src={logo} alt="carrot logo" className="logo" />
        <h2 className="title">당신 근처의 당근 배포배포</h2>
        <p className="subtitle">
          동네라서 가능한 모든 것<br />
          지금 내 동네를 선택하고 시작해보세요!
        </p>
      </div>

      <div className="bottom-area">
        <button className="start-button" onClick={handleStart}>
          시작하기
        </button>
        <p className="login-text">
          이미 계정이 있으신가요? <span onClick={handleLogin}>로그인</span>
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
