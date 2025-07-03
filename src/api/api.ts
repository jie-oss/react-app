import request from './request'
import { Login } from './types/common';

// 登录
export const login = (data: Login) => {
    return request.post('/login', data);
};

// 查询用户列表
export const getUsers = () => {
    return request.get('/api/users');
};

// 新增用户
export const addUser = (data: any) => {
    return request.post('/api/users', data);
};

// 编辑用户
export const editUser = (data: any) => {
    return request.post('/api/users/edit', data);
};

// 删除用户
export const deleteUser = (data: { key: string }) => {
    return request.post('/api/users/delete', data);
};