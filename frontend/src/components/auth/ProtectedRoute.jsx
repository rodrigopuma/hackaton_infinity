import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute() {
    // Usa o hook para pegar o estado da autenticação
    const { isAuthenticated } = useAuth();
    // Se o usuário não estiver autenticado, usamos o componente Navigate para redirecioná-lo para a página de login.
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    // Se o usuário ESTIVER autenticado, renderizamos o <Outlet /> que representa as rotas filhas que estão protegidas.
    return <Outlet />
}

export default ProtectedRoute;