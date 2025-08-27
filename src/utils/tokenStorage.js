// src/utils/tokenStorage.js
const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const EXPIRES_AT_KEY = 'accessTokenExpiresAt';

export function saveAuthTokens({ accessToken, refreshToken, expiresInSeconds }) {
  if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  if (expiresInSeconds != null) {
    const expiresAt = Date.now() + Number(expiresInSeconds) * 1000;
    localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY) || '';
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY) || '';
}

export function getAccessTokenExpiresAt() {
  const v = localStorage.getItem(EXPIRES_AT_KEY);
  return v ? Number(v) : 0;
}

export function isAccessTokenExpired(offsetMs = 5_000) {
  const exp = getAccessTokenExpiresAt();
  if (!exp) return false;
  return Date.now() + offsetMs >= exp;
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}

// === Axios 인터셉터 부착 ===
export function attachAxiosAuthInterceptors(axiosInstance, options = {}) {
  const {
    getAccess = getAccessToken,
    onAuthError = () => {},
    tryRefresh,
  } = options;

  // 요청 헤더 자동 주입
  axiosInstance.interceptors.request.use((config) => {
    const token = getAccess();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 401 처리 및 선택적 재발급
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { response, config } = error || {};
      if (response?.status === 401) {
        if (!config._retry && typeof tryRefresh === 'function') {
          config._retry = true;
          try {
            const newToken = await tryRefresh();
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(config);
            }
          } catch {
            // refresh 실패 시 아래 onAuthError 실행
          }
        }
        onAuthError(error);
      }
      return Promise.reject(error);
    }
  );
}
