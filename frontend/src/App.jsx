import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      {/* Aplicando a fonte e as cores base em toda a aplicação */}
      <div className="font-sans bg-infinity-dark text-infinity-text min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas - não possuem o menu lateral */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* O MainLayout atua como uma "casca" para as rotas privadas */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              {/* <Route path="/calendario" element={<CalendarPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;