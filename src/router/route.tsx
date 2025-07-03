import React, { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AppLayout from "../component/layout";

const HomePage = lazy(() => import('../pages/home'));
const LoginPage = lazy(() => import('../pages/login'));

const RouterConfig = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <Suspense fallback={<div>加载中...</div>}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={
                        <AppLayout>
                            <Routes>
                                <Route path="home" element={<HomePage />} />
                                {/* 其它需要 layout 的页面 */}
                            </Routes>
                        </AppLayout>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default RouterConfig;