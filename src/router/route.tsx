import React, { lazy, Suspense, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet, useLocation } from 'react-router-dom';
import AppLayout from "../component/layout";
import { lazyImport } from "../lib/utils";
import AuthRoute from './AuthRoute';

const LoginPage = lazy(() => import('../pages/login'));

// 错误边界组件
class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>加载页面失败，请重试</div>;
    }
    return this.props.children;
  }
}

// 优化路径处理
interface MenuItem {
    path: string;
    children?: MenuItem[];
}

// 修复路径处理逻辑
const getFullPath = (parentPath: string, childPath: string): string => {
    const cleanParent = parentPath.startsWith('/') ? parentPath : `/${parentPath}`;
    const cleanChild = childPath.startsWith('/') ? childPath.slice(1) : childPath;
    return `${cleanParent}/${cleanChild}`;
};

// 递归生成 Route 节点
function renderRoutes(menu: MenuItem[], parentPath: string = ''): React.ReactNode[] {
    return menu.map((item: MenuItem) => {
        const routePath: string = item.path.startsWith('/') ? item.path.slice(1) : item.path;
        const fullPath: string = getFullPath(parentPath, routePath);

        if (item.children && item.children.length > 0) {
            const firstChildPath: string = getFullPath(fullPath, item.children[0].path);
            return (
                <Route
                    key={fullPath}
                    path={routePath}
                    element={<Outlet />}
                >
                    {renderRoutes(item.children as MenuItem[], fullPath)}
                    <Route index element={<Navigate to={firstChildPath} replace />} />
                </Route>
            );
        }

        const Page = lazyImport(item.path); // 直接使用原始路径
        return (
            <Route
                key={fullPath}
                path={routePath}
                element={<Page />}
            />
        );
    });
}

const RouterConfig = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const menuData = useMemo(() => {
    return JSON.parse(localStorage.getItem('menuData') || '[]');
  }, []);

  // 初始重定向
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route
            path="/login"
            element={
              token
                ? <Navigate to={menuData[0]?.path || '/home'} replace />
                : <LoginPage />
            }
          />
          <Route
            path="/" // 修改根路径为 /
            element={
              <AuthRoute>
                <AppLayout />
              </AuthRoute>
            }
          >
            {renderRoutes(menuData)}
             <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterConfig;