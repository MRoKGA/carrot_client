// src/api/auth.js
import api from './http';

const normalize = (s) => String(s || '').replace(/\D/g, '');

// ✅ 인증번호 발송
export const sendVerificationCode = async (phoneNumber) => {
  const { data } = await api.post('/api/auth/send', null, {
    params: { phoneNumber: normalize(phoneNumber) },
  });
  return data; // { code, message, data }
};

// ✅ 인증번호 재발송
export const resendVerificationCode = async (phoneNumber) => {
  const { data } = await api.post('/api/auth/resend', null, {
    params: { phoneNumber: normalize(phoneNumber) },
  });
  return data; // { code, message, data }
};

// ✅ 인증번호 검증
export const verifyCode = async ({ phoneNumber, code }) => {
  const { data } = await api.post('/api/auth/verify', {
    phoneNumber: normalize(phoneNumber),
    code,
  });
  return data; // { code:200|400|410, message, data:null }
};

// ✅ 닉네임 중복검사
export const validateNickname = async (nickname) => {
  const { data } = await api.post('/api/auth/validate-nickname', null, {
    params: { nickname },
  });
  return data; // { code, message, data }
};

// ✅ 회원가입
export const signup = async ({ region, phoneNumber, nickname, profileImageUrl }) => {
  const payload = { region, phoneNumber: normalize(phoneNumber), nickname, profileImageUrl };
  const { data } = await api.post('/api/auth/signup', payload);
  return data; // { code, message, data }
};

// ✅ 로그인 (410을 예외로 던지지 않도록 validateStatus 지정)
export const login = async ({ phoneNumber, code }) => {
  const res = await api.post(
    '/api/auth/login',
    { phoneNumber: normalize(phoneNumber), code },
    {
      // 4xx도 data로 받게끔(<=499까지 허용)
      validateStatus: (status) => status < 500,
    }
  );
  return res.data; // { code:200|410|..., message, data:{ token, user } }
};
