import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setStorage } from '../lib/utils';
import { message } from 'antd';

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
});

request.interceptors.request.use(
    (config) => {
        // 可以在这里添加请求头等配置
        const token = localStorage.getItem('token');
        if (token) {
            if (!config.headers) {
                config.headers = {} as typeof config.headers;
            }
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 可以在这里处理响应数据
        const { status,data } = response;
        if(status === 200) {
            return data;
        }
        if(status === 401) {
            // 处理未授权的情况
            console.error('Unauthorized access - redirecting to login');
            setStorage('token'); // 清除 token
            message.warning('登录状态已过期，请重新登录！');
            window.location.href = window.location.origin + '/login'; // 重定向到登录页面
            return Promise.reject(new Error(data.message || '未授权访问'));
        }
        message.error(`请求失败: ${data.message || '未知错误'}`);
        return Promise.reject(new Error(data.message || '请求失败'));
    },
    (error) => {
        // 可以在这里处理错误
        if (error.response) {
            console.error('Error response:', error.response);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);