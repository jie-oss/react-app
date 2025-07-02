import request from './request'
import { Login } from './types/common';

export const login = (data: Login) => {
    return request.post('/login', data);
};