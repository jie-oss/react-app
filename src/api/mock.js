import Mock from 'mockjs';
import menu from '../common/js/menu';
import { setStorage, getStorage } from '../lib/utils';

Mock.mock(/login/, 'post', (options) => {
    const body = JSON.parse(options.body);
    let userDatas = getStorage('userDatas');
    if (!userDatas) {
        setStorage('userDatas', [
            {
                username: 'admin',
                password: '123123',
                role: 'admin'
            }
        ]);
        userDatas = getStorage('userDatas');
    }
    // 保证 userDatas 一定是数组
    userDatas = Array.isArray(userDatas) ? userDatas : [];
    const index = userDatas.findIndex(item => {
        return item.username === body.username && item.password === body.password;
    });
    if (index !== -1 && Object.keys(menu).includes(userDatas[index].role)) {
        return {
            code: 200,
            message: '登录成功',
            data: {
                token: `Bearer ${Mock.Random.guid()}`,
                user: {
                    username: 'admin',
                    role: 'admin'
                },
                menuData: menu[userDatas[index].role],
            }
        };
    } else {
        return {
            code: 401,
            message: '用户名或密码错误'
        };
    }
});