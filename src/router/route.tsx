import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import AppLayout from "../component/layout";
import { lazyImport } from "../lib/utils";

const LoginPage = lazy(() => import('../pages/login'));

// 递归生成 Route 节点，parentPath 用于拼接完整路径
function renderRoutes(menu: any[]): React.ReactNode[] {
    return menu.map((item: any) => {
        // 只用当前 path 的最后一级（不带 /）
        const routePath = item.path.replace(/^\//, '');

        if (item.children && item.children.length > 0) {
            // 默认跳转到第一个子路由
            const firstChildPath = item.children[0].path.replace(/^\//, '');
            return (
                <Route
                    key={item.path}
                    path={routePath}
                    element={<Outlet />}
                >
                    {renderRoutes(item.children)}
                    <Route index element={<Navigate to={firstChildPath} replace />} />
                </Route>
            );
        }
        const Page = lazyImport(item.path);
        return (
            <Route
                key={item.path}
                path={routePath}
                element={<Page />}
            />
        );
    });
}

const RouterConfig = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // 获取菜单数据
    const menuData = JSON.parse(localStorage.getItem('menuData') || '[]');

    return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<AppLayout />}>
                    {renderRoutes(menuData)}
                    <Route path="*" element={<Navigate to={menuData[0]?.path?.replace(/^\//, '') || 'home'} replace />} />
                </Route>
            </Routes>
    );
};

export default RouterConfig;