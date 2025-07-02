import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        localStorage.setItem('token', 'auth');
        navigate('/home');
    };

    return (
        <>
            <h3>登录页面</h3>
            <button onClick={handleLogin}>登录</button>
        </>
    );
};
export default LoginPage;