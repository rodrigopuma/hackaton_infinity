import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
    return (
        // O layout principal usa flexbox para posicionar a sidebar e o conteúdo lado a lado.
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                {/* O <Outlet /> renderiza o componente da rota filha (DashboardPage, ProfilePage, etc.) */}
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;