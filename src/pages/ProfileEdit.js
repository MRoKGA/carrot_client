import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back2.png';
import avatarDefault from '../assets/images/avatar-default.jpg';
import '../css/profileEdit.css';
import { validateNickname, signup } from '../api/auth';
import { FaCamera } from "react-icons/fa";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phoneNumber = state?.phoneNumber || ''; // VerifyCode에서 전달
  const region = state?.address || '';          // VerifyCode에서 전달

  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(avatarDefault);
  const [isChecking, setIsChecking] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(null); // true/false/null
  const [message, setMessage] = useState('');

  const fileInputRef = useRef(null);

  const handleBack = () => navigate(-1);

  // 파일 선택 → 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };
  const handleAvatarClick = () => fileInputRef.current?.click();

  // ✅ 닉네임 중복 검사
  const checkNickname = async () => {
    if (!nickname.trim()) {
      setIsValidNickname(false);
      setMessage('닉네임을 입력해주세요.');
      return;
    }
    try {
      setIsChecking(true);
      setMessage('');
      const result = await validateNickname(nickname.trim());
      if (Number(result.code) === 200) {
        setIsValidNickname(true);
        setMessage(result.message || '사용 가능한 닉네임입니다.');
      } else {
        setIsValidNickname(false);
        setMessage(result.message || '중복된 닉네임입니다.');
      }
    } catch (e) {
      setIsValidNickname(false);
      const msg = e?.response?.data?.message || e?.message || '중복 검사 중 오류가 발생했습니다.';
      setMessage(msg);
    } finally {
      setIsChecking(false);
    }
  };

    // ✅ 회원가입 → /home 이동
    const handleConfirm = async () => {
  if (!nickname.trim()) {
    alert('닉네임을 입력해주세요.');
    return;
  }
  if (isValidNickname !== true) {
    alert('닉네임 중복검사를 통과해야 합니다.');
    return;
  }

  try {
    // ✅ 기본 아바타 import값(상대/static 경로)을 절대 URL로 변환
    //const profileImageUrl = new URL(avatarDefault, window.location.origin).toString();
    const profileImageUrl = "/dd";
    // 디버그 로그
    //console.log('📸 profileImage state(미리보기):', profileImage); // DataURL일 수도 있음 (미리보기용)
    console.log('📤 서버로 전송할 profileImageUrl(절대경로):', profileImageUrl);

    const res = await signup({
      region,
      phoneNumber,
      nickname: nickname.trim(),
      profileImageUrl, // ✅ 항상 절대 URL 전송
    });

    if (Number(res.code) === 200) {
      alert('회원가입이 완료되었습니다!');
      navigate('/home');
    } else {
      alert(res?.message ?? '회원가입에 실패했습니다.');
    }
  } catch (e) {
    const msg = e?.response?.data?.message || e?.message || '서버 오류로 회원가입에 실패했습니다.';
    alert(msg);
  }
    };


  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <img src={backIcon} alt="뒤로가기" className="back-icon" onClick={handleBack} />
        <span className="header-title">프로필 수정</span>
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={isChecking || isValidNickname !== true}
        >
          완료
        </button>
      </div>

      <div className="profile-content">
        <div className="avatar-box" onClick={handleAvatarClick}>
          <img src={profileImage} alt="프로필 이미지" className="avatar-img" />
          <button type="button" className="camera-btn"><FaCamera /></button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <label className="nickname-label">닉네임</label>
        <div className="nickname-row">
          <input
            type="text"
            placeholder="변경할 닉네임 입력"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsValidNickname(null);   // 입력이 바뀌면 상태 초기화
              setMessage('');
            }}
            className="nickname-input"
          />
          <button
            type="button"
            className="nickname-check-btn"
            onClick={checkNickname}
            disabled={isChecking || !nickname.trim()}
          >
            {isChecking ? '확인중...' : '중복확인'}
          </button>
        </div>

        {message && (
          <p
            className="nickname-hint"
            style={{ color: isValidNickname ? '#36d399' : '#ff6b6b' }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
