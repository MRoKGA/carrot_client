import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back2.png'; // 뒤로가기 이미지
import countryFlag from '../assets/images/country.png'; // 태극기 이미지
import '../css/phoneInput.css';

const PhoneNumberInput = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    console.log('입력된 번호:', phoneNumber);
    // 인증 페이지로 이동 또는 서버 요청 처리
  };

  return (
    <div className="phone-wrapper">
      <div className="header">
        <img
          src={backIcon}
          alt="뒤로가기"
          className="back-icon"
          onClick={handleBack}
        />
      </div>

      <div className="content">
        <h2 className="title">휴대폰 번호를 입력해주세요.</h2>

        <div className="input-wrapper">
          <img
            src={countryFlag}
            alt="국기"
            className="country-flag"
          />
          <span className="country-code">+82</span>
          <input
            type="tel"
            maxLength={13}
            placeholder="000 0000 0000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
          />
        </div>

        <p className="help-text">
          휴대폰 번호가 변경되었나요? <span className="link-text">이메일로 계정 찾기</span>
        </p>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default PhoneNumberInput;
