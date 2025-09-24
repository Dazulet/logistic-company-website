import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from './Context/ThemeContext';

// Импортируем наши страницы
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

// Создаем компонент "защищенного маршрута" для админ-панели
const ProtectedAdminRoute = ({ children }) => {
  // В будущем здесь можно будет проверять не только токен, но и роль
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Главная страница, доступна всем */}
          <Route path="/" element={<HomePage />} />
          
          {/* Страница логина. Если уже вошел, перенаправляем на главную */}
          <Route 
            path="/login" 
            element={!token ? <LoginPage /> : <Navigate to="/" replace />} 
          />
          
          {/* Страница регистрации. Если уже вошел, перенаправляем на главную */}
          <Route 
            path="/register" 
            element={!token ? <RegisterPage /> : <Navigate to="/" replace />} 
          />
          
          {/* 
            Админ-панель будет частью HomePage и будет показываться/скрываться
            внутри HomePage в зависимости от авторизации.
            Если бы это была отдельная страница, маршрут выглядел бы так:
            <Route path="/admin" element={<ProtectedAdminRoute><AdminPage /></ProtectedAdminRoute>} />
          */}

          {/* Страница 404 */}
          <Route path="*" element={
            <div className="text-center p-10">
              <h2>404 - Страница не найдена</h2>
              <Link to="/" className="text-blue-500">Вернуться на главную</Link>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;