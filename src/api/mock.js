import Mock from 'mockjs';
import menu from '../common/js/menu';
import { setStorage, getStorage } from '../lib/utils';

Mock.mock(/login/, 'post', (options) => {
    const body = JSON.parse(options.body);
    let userDatas = getStorage('userDatas');
    if (!userDatas) {
        setStorage('userDatas', [
            {
                key: 1,
                username: 'admin',
                password: '123123',
                role: 'Admin',
                email: 'admin@admin.com',
                status: 'Active',
            }
        ]);
    }
    userDatas = getStorage('userDatas');
    console.log(userDatas, 'userDatas');
    // 保证 userDatas 一定是数组
    userDatas = Array.isArray(userDatas) ? userDatas : [];
    const index = userDatas.findIndex(item => {
        return item.username == body.username && item.password == body.password;
    });
    console.log(index, 'index');
    
    if (index !== -1 && Object.keys(menu).includes(userDatas[index].role) && userDatas[index].status === 'Active') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                token: `Bearer ${Mock.Random.guid()}`,
                user: {
                    username: userDatas[index].username,
                    role: userDatas[index].role
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

// 查询用户列表
Mock.mock(/\/api\/users$/, 'get', () => {
    let userDatas = getStorage('userDatas') || [];
    return {
        code: 200,
        data: userDatas,
    };
});

// 新增用户
Mock.mock(/\/api\/users$/, 'post', (options) => {
    const body = JSON.parse(options.body);
    let userDatas = getStorage('userDatas') || [];
    const newUser = {
        ...body,
        key: Mock.Random.guid(),
    };
    userDatas.push(newUser);
    setStorage('userDatas', userDatas);
    return {
        code: 200,
        message: '新增成功',
        data: newUser,
    };
});

// 编辑用户
Mock.mock(/\/api\/users\/edit/, 'post', (options) => {
    const body = JSON.parse(options.body);
    let userDatas = getStorage('userDatas') || [];
    userDatas = userDatas.map(item =>
        item.key === body.key ? { ...item, ...body } : item
    );
    setStorage('userDatas', userDatas);
    return {
        code: 200,
        message: '编辑成功',
    };
});

// 删除用户
Mock.mock(/\/api\/users\/delete/, 'post', (options) => {
    const body = JSON.parse(options.body);
    let userDatas = getStorage('userDatas') || [];
    userDatas = userDatas.filter(item => item.key !== body.key);
    setStorage('userDatas', userDatas);
    return {
        code: 200,
        message: '删除成功',
    };
});