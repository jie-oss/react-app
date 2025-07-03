import * as Icons from '@ant-design/icons';
import React, {lazy} from 'react';
export const setStorage = (key: string, value: any = undefined) => {
    return value === undefined ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key: string) {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

// 工具函数：根据字符串获取 icon 组件
export const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? React.createElement(IconComponent) : null;
};

// 动态导入页面组件的工具函数
export const lazyImport = (path: string) => {
    // 保证 path 以 / 开头，且不会出现多余的 /
    const fixedPath = path.startsWith('/') ? path : `/${path}`;
    return lazy(() => import(`../pages${fixedPath}`));
};