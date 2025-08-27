// src/utils/userStorage.js
const USER_KEY = 'currentUser';

export const saveUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u || {}));
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null');
export const clearUser = () => localStorage.removeItem(USER_KEY);
