const fs = require('fs');
const path = require('path');

const menuData = [
    {
        "breadcrumbName": "index",
        "icon": "BankOutlined",
        "path": "/home"
    },
    {
        "breadcrumbName": "doc",
        "icon": "FileTextOutlined",
        "path": "/doc"
    },
    {
        "breadcrumbName": "guide",
        "icon": "SendOutlined",
        "path": "/guide"
    },
    {
        "breadcrumbName": "permission",
        "icon": "PropertySafetyOutlined",
        "path": "/authority",
        "children": [
            {
                "breadcrumbName": "pagePermission",
                "path": "/pageAuthority"
            },
            {
                "breadcrumbName": "rolePermission",
                "path": "/characterAuthority",
                "icon": "SendOutlined"
            }
        ]
    },
    {
        "breadcrumbName": "routeTitle",
        "path": "/child",
        "children": [
            {
                "breadcrumbName": "route1",
                "path": "/routerTest1",
                "icon": "SendOutlined",
                "children": [
                    {
                        "breadcrumbName": "route11",
                        "path": "/routerTest11",
                        "icon": "SendOutlined"
                    },
                    {
                        "breadcrumbName": "route12",
                        "path": "/routerTest12",
                        "icon": "SendOutlined",
                        "children": [
                            {
                                "breadcrumbName": "route121",
                                "path": "/routerTest121",
                                "icon": "SendOutlined"

                            },
                            {
                                "breadcrumbName": "route122",
                                "path": "/routerTest122",
                                "icon": "SendOutlined"
                            }
                        ]
                    },
                    {
                        "breadcrumbName": "route13",
                        "path": "/routerTest13",
                        "icon": "SendOutlined"
                    }
                ]
            },
            {
                "breadcrumbName": "route2",
                "path": "routerTest2",
                "icon": "SendOutlined"
            }
        ]
    }
]

function walk(menu) {
    menu.forEach(item => {
        const pagePath = path.join(__dirname, '../pages', item.path.replace(/^\//, '') + '.tsx');
        if (!fs.existsSync(pagePath)) {
            fs.mkdirSync(path.dirname(pagePath), { recursive: true });
            fs.writeFileSync(pagePath, `import React from 'react';\nexport default () => <div>${item.path}</div>;`);
            console.log('Created:', pagePath);
        }
        if (item.children) walk(item.children);
    });
}

walk(menuData);