import React from 'react';
import { Menu } from 'antd';
import { getStorage, setStorage } from '../lib/utils';
import type { MenuProps } from 'antd';
import { getIcon } from '../lib/utils';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

type CustomMenuItem = (Required<MenuProps>['items'][number]) & { path?: string };

function buildMenuItems(items: any[], parentKey = '', parentPath = ''): CustomMenuItem[] {
    return items.map((item: any, idx: number) => {
        const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;
        // 如果 item.path 是绝对路径就用它，否则拼接父 path
        const fullPath = item.path
            ? (item.path.startsWith('/') ? item.path : `${parentPath}/${item.path}`.replace(/\/+/g, '/'))
            : parentPath;
        return {
            key,
            label: <FormattedMessage id={item.breadcrumbName} />,
            icon: item.icon ? getIcon(item.icon) : null,
            children: item.children ? buildMenuItems(item.children, key, fullPath) : undefined,
            path: fullPath,
        };
    });
}

function findPathByKey(items: CustomMenuItem[], key: string): string | undefined {
    for (const item of items) {
        if (item.key === key) return item.path;
        if ('children' in item && item.children) {
            const path = findPathByKey(item.children as CustomMenuItem[], key);
            if (path) return path;
        }
    }
    return undefined;
}

// 递归查找当前 path 对应的菜单 key
function findKeyByPath(items: CustomMenuItem[], path: string): string | undefined {
    for (const item of items) {
        if (item.path === path) return String(item.key);
        if ('children' in item && item.children) {
            const key = findKeyByPath(item.children as CustomMenuItem[], path);
            if (key) return key;
        }
    }
    return undefined;
}

const LeftMenu = () => {
    const MenuItems = getStorage('menuData') || [];
    const navigate = useNavigate();
    const location = useLocation();
    const items: CustomMenuItem[] = buildMenuItems(MenuItems);

    // 根据当前路由 path 找到对应菜单 key
    const selectedKey = findKeyByPath(items, location.pathname);

    const onClick: MenuProps['onClick'] = (e) => {
        const path = findPathByKey(items, e.key);
        const token = getStorage('token');
        if (path && path !== location.pathname) {
            token ? navigate(path) : navigate('/login');
        }
    };

    return (
        <Menu
            onClick={onClick}
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey ? [selectedKey] : []}
            items={items}
        />
    );
};

export default LeftMenu;