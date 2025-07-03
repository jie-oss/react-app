import React from 'react';
import { Menu } from 'antd';
import { getStorage } from '../lib/utils';
import type { MenuProps } from 'antd';
import { getIcon } from '../lib/utils';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

type CustomMenuItem = (Required<MenuProps>['items'][number]) & { path?: string };

function buildMenuItems(items: any[], parentKey = ''): CustomMenuItem[] {
    return items.map((item: any, idx: number) => {
        const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;
        return {
            key,
            label: <FormattedMessage id={item.breadcrumbName} />,
            icon: item.icon ? getIcon(item.icon) : null,
            children: item.children ? buildMenuItems(item.children, key) : undefined,
            path: item.path || '',
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

const LeftMenu = () => {
    const MenuItems = getStorage('menuData') || [];
    const navigate = useNavigate();
    const items: CustomMenuItem[] = buildMenuItems(MenuItems);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        const path = findPathByKey(items, e.key);
        if (path) {
            navigate(path || '/');
        }
    };

    return (
        <Menu onClick={onClick} mode="inline" theme="dark" defaultSelectedKeys={['0']} items={items} />
    );
};

export default LeftMenu;