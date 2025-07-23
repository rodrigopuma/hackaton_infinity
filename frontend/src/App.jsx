// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import Register from "./pages/registerPage";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* Rota principal que leva para o Dashboard */}
            <Route path="/" element={<DashboardPage />} />

            {/* Rota para a página do Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Rota para a página de Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rota para a página de Registro */}
            <Route path="/registrar" element={<Register />} />

            {/* Rota para a página de Perfil */}
            <Route path="/perfil" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
