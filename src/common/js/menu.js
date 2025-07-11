export default {
  "Admin": [
    {
        "breadcrumbName":"index",
        "icon":"BankOutlined",
        "path":"/home"
    },
    {
        "breadcrumbName":"doc",
        "icon":"FileTextOutlined",
        "path":"/doc"
    },
    {
        "breadcrumbName":"guide",
        "icon":"SendOutlined",
        "path":"/guide"
    },
    {
        "breadcrumbName":"permission",
        "icon":"PropertySafetyOutlined",
        "path":"/authority",
        "children":[
            {
                "breadcrumbName":"pagePermission",
                "path":"pageAuthority"
            },
            {
                "breadcrumbName":"rolePermission",
                "path":"characterAuthority",
                "icon":"SendOutlined"
            }
        ]
    },
  ],
  "User": [
    {
        "breadcrumbName":"index",
        "icon":"BankOutlined",
        "path":"/home"
    },
    {
        "breadcrumbName":"permission",
        "icon":"PropertySafetyOutlined",
        "path":"/authority",
        "children":[
            {
                "breadcrumbName":"pagePermission",
                "path":"pageAuthority"
            },
        ]
    },
  ],
}