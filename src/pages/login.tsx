import React from "react";
import { useNavigate } from "react-router-dom";
import "../common/css/login.less";
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { FormattedMessage } from "react-intl";
import { login } from "../api/api";
import { setStorage } from "../lib/utils";

type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        login(values).then((res: any) => {
            debugger
            if (res.code == 200) {
                setStorage('token', res.data.token);
                setStorage('menuData',res.data.menuData);
                 window.location.href = '/home'
            } else {
                message.error(res.message || '账户名或密码错误');
            }
        })
    };
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div className="login-wrapper">
                <h3 className="form-title"><FormattedMessage id="login" /></h3>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="login-form"
                >
                    <Form.Item<FieldType>
                        label={<FormattedMessage id="Username" />}
                        name="username"
                        rules={[{ required: true, message: <FormattedMessage id="userMessage" /> }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label={<FormattedMessage id="Password" />}
                        name="password"
                        rules={[{ required: true, message: <FormattedMessage id="passwordMessage" /> }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button className="login-form-button" type="primary" htmlType="submit">
                            <FormattedMessage id="submit" />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default LoginPage;