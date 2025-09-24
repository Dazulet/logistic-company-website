import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // <-- НОВЫЙ ИМПОРТ

// Функция для декодирования токена
const decodeToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Токен истек?
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('authToken');
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem('authToken'); // Если токен невалиден, удаляем его
    return null;
  }
};

const initialState = {
  token: localStorage.getItem('authToken') || null,
  user: decodeToken(localStorage.getItem('authToken')), // <-- Сохраняем декодированные данные
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.user = decodeToken(token); // <-- Декодируем и сохраняем данные пользователя
      localStorage.setItem('authToken', token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null; // <-- Очищаем данные пользователя
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;