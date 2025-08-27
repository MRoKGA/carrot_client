import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back2.png';
import '../css/verify.css';
import { resendVerificationCode, login } from '../api/auth'; // ✅ verifyCode 제거
import { saveAuthTokens } from '../utils/tokenStorage';
import { saveUser } from '../utils/userStorage';

const TOTAL_SECONDS = 5 * 60;

const LoginVerify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phoneNumber = state?.phoneNumber || '';

  const [code, setCode] = useState('');
  const [left, setLeft] = useState(TOTAL_SECONDS);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!phoneNumber) navigate('/login');
  }, [phoneNumber, navigate]);

  // 타이머
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const timeText = useMemo(() => {
    const m = String(Math.floor(left / 60)).padStart(2, '0');
    const s = String(left % 60).padStart(2, '0');
    return `${m}:${s}`;
  }, [left]);

  const handleBack = () => navigate(-1);

  const onChangeCode = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(onlyDigits);
  };

  // 6자리 자동 로그인
  useEffect(() => {
    if (code.length === 6) onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const onSubmit = async () => {
    if (code.length < 6 || verifying) return;
    if (left === 0) {
      alert('인증번호가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.');
      return;
    }

    try {
      setVerifying(true);

      // ✅ verifyCode 호출 없이 바로 로그인 시도
      const res = await login({ phoneNumber, code });

      // 만료(410) → 재전송 안내 및 타이머/코드 리셋
      if (Number(res.code) === 410) {
        const goResend = window.confirm('인증코드가 만료되었습니다. 새 코드를 받으시겠어요?');
        if (goResend) {
          const r = await resendVerificationCode(phoneNumber);
          if (Number(r.code) === 200) {
            alert('새 인증번호가 발송되었습니다.');
            setLeft(TOTAL_SECONDS);
            setCode('');
          } else {
            alert(r?.message ?? '재전송에 실패했습니다.');
          }
        } else {
          setCode('');
        }
        return;
      }

      // 성공
      if (Number(res.code) === 200 && res.data?.token) {
        const { accessToken, refreshToken, expiresInSeconds } = res.data.token || {};
        saveAuthTokens({ accessToken, refreshToken, expiresInSeconds });
        if (res.data.user) saveUser(res.data.user);
        alert('로그인 되었습니다.');
        navigate('/home', { replace: true });
        return;
      }

      // 기타 실패
      if (Number(res.code) === 400) {
        alert(res?.message ?? '인증번호가 올바르지 않습니다.');
        setCode('');
        return;
      }

      alert(res?.message ?? '로그인에 실패했습니다.');
      setCode('');
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || '서버 오류가 발생했습니다.';
      alert(msg);
    } finally {
      setVerifying(false);
    }
  };

  const onResend = async () => {
    if (resending) return;
    try {
      setResending(true);
      const r = await resendVerificationCode(phoneNumber);
      if (Number(r.code) === 200) {
        alert('인증번호가 다시 발송되었습니다.');
        setLeft(TOTAL_SECONDS);
        setCode('');
      } else {
        alert(r?.message ?? '재전송에 실패했습니다.');
      }
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || '서버와 연결에 실패했습니다.');
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
            disabled={verifying}
          />
          <span className="verify-timer">{timeText}</span>
        </div>

        <button className="verify-resend" onClick={onResend} disabled={resending}>
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

export default LoginVerify;
