// src/pages/VerifyCode.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back2.png';
import '../css/verify.css';
import { resendVerificationCode, verifyCode } from '../api/auth';

const TOTAL_SECONDS = 5 * 60; // 5분

const VerifyCode = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phoneNumber = state?.phoneNumber || '';
  const address = state?.address || '';

  const [code, setCode] = useState('');
  const [left, setLeft] = useState(TOTAL_SECONDS);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const timerRef = useRef(null);

  // 타이머
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // mm:ss 포맷
  const timeText = useMemo(() => {
    const m = String(Math.floor(left / 60)).padStart(2, '0');
    const s = String(left % 60).padStart(2, '0');
    return `${m}:${s}`;
  }, [left]);

  const handleBack = () => navigate(-1);

  // 숫자만, 최대 6자리
  const onChangeCode = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(onlyDigits);
  };

  // 6자리 입력되면 자동 검증
  useEffect(() => {
    if (code.length === 6) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // ✅ 인증 호출
  const onSubmit = async () => {
    if (code.length < 6 || verifying) return;
    if (left === 0) {
      alert('인증번호가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.');
      return;
    }

    try {
      setVerifying(true);
      const result = await verifyCode({ phoneNumber, code });
      // result.code: 200(성공) | 400(불일치) | 410(만료)
      if (Number(result.code) === 200) {
        alert('인증이 완료되었습니다!');
        navigate('/profile-edit', { state: { phoneNumber, address } }); 
      } else if (Number(result.code) === 400) {
        alert('인증번호가 올바르지 않습니다.');
        setCode('');
      } else if (Number(result.code) === 410) {
        alert('인증번호가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.');
      } else {
        alert(result?.message ?? '인증에 실패했습니다.');
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || '서버 오류가 발생했습니다.';
      alert(msg);
    } finally {
      setVerifying(false);
    }
  };

  // ✅ 재전송 호출
const onResend = async () => {
  if (resending) return;  // ✅ 중복 클릭 방지만
  setResending(true);
  try {
    const result = await resendVerificationCode(phoneNumber);
    if (Number(result.code) === 200) {
      alert('인증번호가 다시 발송되었습니다.');
      // 원하시면 재전송 시 타이머 리셋 유지
      setLeft(TOTAL_SECONDS);   // ✅ 재전송하면 5분 재시작 (원치 않으면 이 줄 삭제)
      setCode('');
    } else {
      alert(result?.message ?? '재전송에 실패했습니다.');
    }
  } catch (e) {
    const msg = e?.response?.data?.message || e?.message || '서버와 연결에 실패했습니다.';
    alert(msg);
  } finally {
    setResending(false);
  }
};

  return (
    <div className="verify-wrapper">
      <div className="verify-header">
        <img src={backIcon} alt="뒤로가기" className="verify-back" onClick={handleBack} />
        <div className="verify-title-compact">본인인증</div>
      </div>

      <div className="verify-content">
        <h2 className="verify-title">인증번호를 입력해 주세요</h2>

        <div className={`verify-input-box ${left === 0 ? 'expired' : ''}`}>
          <input
            className="verify-input"
            inputMode="numeric"
            placeholder="인증번호 6자리"
            value={code}
            onChange={onChangeCode}
            disabled={verifying}                // ✅ 검증 중 입력 잠금
          />
          <span className="verify-timer">{timeText}</span>
        </div>


        <button
        className="verify-resend"
        onClick={onResend}
        disabled={resending}  // ✅ 타이머와 무관, 전송 중에만 비활성
        >
        {resending ? '재전송 중...' : '인증번호 재전송'}
        </button>

        <button
          type="button"
          className="verify-help"
          onClick={() => alert('인증번호가 오지 않는 경우: 스팸함 확인 또는 번호 재확인 후 재전송을 눌러주세요.')}
        >
          인증번호가 오지 않나요?
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
