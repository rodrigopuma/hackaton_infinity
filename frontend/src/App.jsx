// src/App.jsx - Versão Corrigida

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Páginas e Componentes
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CalendarPage from "./pages/CalendarPage";
import AdminListUsuariosPage from "./pages/AdminListUsersPage";
import SpreadsheetPage from "./pages/SpreadsheetPage"; // Nova página.

function App() {
  return (
    <ThemeProvider>
      {/* CORREÇÃO: O BrowserRouter deve vir antes do AuthProvider,
          pois o AuthProvider usa o hook useNavigate, que depende do BrowserRouter. */}
      <BrowserRouter>
        <AuthProvider>
          <div className="font-sans bg-gray-100 dark:bg-infinity-dark text-infinity-gray dark:text-infinity-text min-h-screen">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Agrupamento de Rotas Protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/perfil" element={<ProfilePage />} />
                  <Route path="/calendario" element={<CalendarPage />} />
                  <Route path="/planilhas" element={<SpreadsheetPage />} />
                  <Route
                    path="/admin-usuarios"
                    element={<AdminListUsuariosPage />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
