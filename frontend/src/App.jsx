// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  // Miguel: Nós próximos passos iremos controlar o isDarkMode com um contexto
  // Por enquanto pode trocar entre 'true' e 'false' para realizar testes
  const isDarkMode = false;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* Rota principal que leva para o Dashboard */}
            <Route path="/" element={<DashboardPage />} />

            {/* Rota para a página de Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rota para a página de Perfil */}
            <Route path="/perfil" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;