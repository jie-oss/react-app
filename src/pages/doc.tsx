import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Select, message } from 'antd';
import type { TableProps } from 'antd';
import { getUsers, addUser, editUser, deleteUser } from '../api/api';
import { FormattedMessage, useIntl } from 'react-intl';

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
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [editRecord, setEditRecord] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const intl = useIntl();

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

    useEffect(() => {
        if (search.trim()) {
            setFilteredData(
                data.filter(item => item.username.toLowerCase().includes(search.trim().toLowerCase()))
            );
        } else {
            setFilteredData(data);
        }
    }, [data, search]);

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
                message.success(intl.formatMessage({ id: 'edit-success' }));
            } else {
                await addUser(values);
                message.success(intl.formatMessage({ id: 'add-success' }));
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
        message.success(intl.formatMessage({ id: 'delete-success' }));
        fetchData();
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: intl.formatMessage({ id: 'Username' }),
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: intl.formatMessage({ id: 'Email' }),
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: intl.formatMessage({ id: 'Role' }),
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: intl.formatMessage({ id: 'Status' }),
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.key == '1' ? null : (
                    <Space size="middle">
                        <a key="edit" onClick={() => showModal(record)}>{intl.formatMessage({ id: 'edit' })}</a>
                        <a key="delete" onClick={() => handleDelete(record)}>{intl.formatMessage({ id: 'delete' })}</a>
                    </Space>
                )
            ),
        },
    ];

    return (
        <>
            <Space style={{ margin: '10px' }}>
                <Button type="primary" onClick={() => showModal()}>+{intl.formatMessage({ id: 'add' })}</Button>
                <Input.Search
                    placeholder={intl.formatMessage({ id: 'serch' })}
                    allowClear
                    onSearch={setSearch}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 200 }}
                />
            </Space>
            <Table<DataType>
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                pagination={{ pageSize: 5 }}
                rowKey="key"
                showSorterTooltip={false}
            />
            <Modal
                title={editRecord ? intl.formatMessage({ id: 'edit' }) : intl.formatMessage({ id: 'add' })}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnHidden
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label={intl.formatMessage({ id: 'Username' })}
                        name="username"
                        rules={[{ required: true, message: intl.formatMessage({ id: 'rule1' }) }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({ id: 'Email' })}
                        name="email"
                        rules={[
                            { required: true, message: intl.formatMessage({ id: 'rule2' }) },
                            { type: 'email', message: intl.formatMessage({ id: 'rule3' }) }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({ id: 'Password' })}
                        name="password"
                        rules={[{ required: true, message: intl.formatMessage({ id: 'rule4' }) }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({ id: 'Role' })}
                        name="role"
                        rules={[{ required: true, message: intl.formatMessage({ id: 'rule5' }) }]}
                    >
                        <Select>
                            <Select.Option value="Admin">Admin</Select.Option>
                            <Select.Option value="User">User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({ id: 'Status' })}
                        name="status"
                        rules={[{ required: true, message: intl.formatMessage({ id: 'rule6' }) }]}
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