// src/pages/LoginPhone.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back2.png';
import countryFlag from '../assets/images/country.png';
import '../css/phoneInput.css';
import { sendVerificationCode } from '../api/auth';

const LoginPhone = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => navigate(-1);

  const handleConfirm = async () => {
    if (!phoneNumber) return alert('휴대폰 번호를 입력해주세요.');
    try {
      setLoading(true);
      const res = await sendVerificationCode(phoneNumber);
      if (Number(res.code) === 200) {
        // 인증번호 발송 성공 → 인증화면
        navigate('/login/verify', { state: { phoneNumber } });
      } else {
        alert(res?.message ?? '인증번호 발송에 실패했습니다.');
      }
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || '서버와 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phone-wrapper">
      <div className="header">
        <img src={backIcon} alt="뒤로가기" className="back-icon" onClick={handleBack} />
      </div>

      <div className="content">
        <h2 className="title">휴대폰 번호를 입력해주세요.</h2>

        <div className="input-wrapper">
          <img src={countryFlag} alt="국기" className="country-flag" />
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

      <button className="confirm-button" onClick={handleConfirm} disabled={loading}>
        {loading ? '전송 중...' : '확인'}
      </button>
    </div>
  );
};

export default LoginPhone;
