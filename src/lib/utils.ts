import * as Icons from '@ant-design/icons';
import React from 'react';
export const setStorage = (key: string, value: any = undefined) => {
    return value === undefined ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// 工具函数：根据字符串获取 icon 组件
export const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? React.createElement(IconComponent) : null;
};