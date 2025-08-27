// src/api/http.js
import axios from 'axios';
import { attachAxiosAuthInterceptors, clearAuthTokens } from '../utils/tokenStorage';

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, // 쿠키 기반이면 활성화
});

const onAuthError = () => {
  clearAuthTokens();
  // window.location.href = '/login'; // 필요 시 자동 이동
};

// refresh 엔드포인트가 생기면 구현
async function tryRefresh() {
  // 예시:
  // const { data } = await api.post('/api/auth/refresh', { refreshToken: getRefreshToken() });
  // saveAuthTokens(data?.token ?? {});
  // return data?.token?.accessToken || '';
  return null;
}

attachAxiosAuthInterceptors(api, { onAuthError, tryRefresh });

export default api;
