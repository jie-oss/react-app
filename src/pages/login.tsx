import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        localStorage.setItem('token', 'auth');
        navigate('/home');
    };

    return (
        <>
            <h3>登录页面</h3>
            <Button onClick={handleLogin}>登录</Button>
        </>
    );
};
export default LoginPage;