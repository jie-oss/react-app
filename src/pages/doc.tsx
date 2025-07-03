import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Select, message } from 'antd';
import type { TableProps } from 'antd';
import { getUsers, addUser, editUser, deleteUser } from '../api/api';

interface DataType {
    key: string;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
}

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [editRecord, setEditRecord] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(false);

    // 查询用户列表
    const fetchData = async () => {
        setLoading(true);
        const res = await getUsers();
        setData(res.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showModal = (record?: DataType) => {
        setIsModalOpen(true);
        if (record) {
            setEditRecord(record);
            form.setFieldsValue(record);
        } else {
            setEditRecord(null);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editRecord) {
                await editUser({ ...editRecord, ...values });
                message.success('编辑成功');
            } else {
                await addUser(values);
                message.success('新增成功');
            }
            setIsModalOpen(false);
            form.resetFields();
            setEditRecord(null);
            fetchData();
        } catch (err) {
            // 校验失败
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditRecord(null);
    };

    const handleDelete = async (record: DataType) => {
        await deleteUser({ key: record.key });
        message.success('删除成功');
        fetchData();
    };

    const columns: TableProps<DataType>['columns'] = [
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.key == '1' ? null : (
                    <Space size="middle">
                        <a key="edit" onClick={() => showModal(record)}>Edit</a>
                        <a key="delete" onClick={() => handleDelete(record)}>Delete</a>
                    </Space>
                )
            ),
        },
    ];

    return (
        <>
            <Button type="primary" style={{ margin: '10px' }} onClick={() => showModal()}>+Add</Button>
            <Table<DataType>
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={data.length > 5 ? { pageSize: 5 } : false}
                rowKey="key"
            />
            <Modal
                title={editRecord ? "编辑" : "新增"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnHidden
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '邮箱格式不正确' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: '请选择角色' }]}
                    >
                        <Select>
                            <Select.Option value="Admin">Admin</Select.Option>
                            <Select.Option value="User">User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: '请选择状态' }]}
                    >
                        <Select>
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};