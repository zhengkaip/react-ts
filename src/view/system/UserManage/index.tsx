import React, { useState } from 'react';
import { Button, Form, Input, Modal, Row, Col, Table, TreeSelect, Select } from 'antd'
import Style from './index.module.scss'
import { tableData, tableTitle } from './data'
const { Option } = Select;

interface searchParamsType {
    keyword: string,
    page: number,
    size: number
}

const layout = {
    labelCol: { span: 8 }
};

const User = () => {
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm()
    const [searchParams, setSearchParams] = useState<searchParamsType>({
        keyword: '',
        page: 1,
        size: 10
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const columns = [...tableTitle, {
        title: '操作',
        width: '175px',
        render: (row: any) => (
            <>
                <Button size="middle">编辑</Button>
                <Button style={{ marginRight: '0' }} size="middle">删除</Button>
            </>
        ),
    }]
    const onFinish = (values: any) => {
        console.log(values);
        setSearchParams(Object.assign({},))
    }
    const handleOk = () => {
        modalForm
            .validateFields()
            .then(values => {
                if (!values.errorFields) {

                }
                console.log(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    return (
        <div className={Style.content}>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} initialValues={searchParams}>
                <Form.Item
                    name="keyword"
                >
                    <Input placeholder="请输入名称或邮箱搜索" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button htmlType="button" onClick={() => {
                        setIsModalVisible(true)
                    }}>
                        新增
                    </Button>
                    <Button htmlType="button">
                        导出
                    </Button>
                </Form.Item>
            </Form>
            <Table
                rowKey="id"
                bordered={true}
                columns={columns}
                dataSource={tableData}
            />
            <Modal title="新增用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <Form form={modalForm} {...layout}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="用户名称"
                                name="username"
                                rules={[{ required: true, message: '请输入节点路由' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="电话"
                                name="phone"
                                rules={[{ required: true, message: '请输入组件路径' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[{ required: true, message: '请输入节点排序' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="部门"
                                name="pId"
                                rules={[{ required: true, message: '请选择部门' }]}
                            >
                                <TreeSelect style={{ width: '100%' }}>

                                </TreeSelect>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="角色"
                                name="roles"
                                rules={[{ required: true, message: '请选择角色' }]}
                                labelCol={{ span: 4 }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="请选择角色"
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div >
    )
}
export default User