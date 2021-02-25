import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Input, Radio, Popover } from 'antd'

import MyIcon from '@/icon'
import icons from '@/components/IconSelect/requireIcons'
import { IconSelect } from '@/components'

const tableData = [
    {
        id: 1,
        name: '系统管理',
        icon: 'icon-damuzhi',
        type: '目录',
        route: '/index',
        path: 'home',
        sort: 1,
        date: '2020-10-22',
        children: [{
            id: 11,
            name: '菜单管理',
            icon: 'icon-damuzhi',
            type: '菜单',
            route: '/index',
            path: 'home',
            sort: 1,
            date: '2020-10-22',
        }]
    },
    {
        id: 2,
        name: '系统管理',
        icon: 'icon-damuzhi',
        type: '菜单',
        route: '/index',
        path: 'home',
        sort: 1,
        date: '2020-10-22'
    },
];
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const MenuManage = () => {
    const tableTitle = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (text: string) => {
                return <MyIcon type={text}></MyIcon>
            }
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text: string) => {
                return <Button size="small" type="primary">{text}</Button>
            }
        },
        {
            title: '路由地址',
            dataIndex: 'route',
            key: 'route',
        },
        {
            title: '组件路径',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
        },
        {
            title: '更新日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: () => (
                <Space size="middle">
                    <span onClick={addMenu}>添加</span>
                    <span>编辑</span>
                    <span>删除</span>
                </Space>
            ),
        }
    ];
    const [columns, setColumns] = useState<typeof tableTitle>(tableTitle)
    const [data, setData] = useState<typeof tableData>(tableData)
    const [open, setOpen] = useState(true)
    const [expKeys, setExpKeys] = useState<number[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [iconName, setIconName] = useState('')
    const [form] = Form.useForm();
    const openOrCloseAll = () => {
        !open ? setExpKeys([]) : setExpKeys(data && data.map(i => i.id));
        setOpen(!open)
    };

    const handleOk = () => {
        form
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

    const addMenu = () => {
        setIsModalVisible(true)
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log(icons)
    return (
        <>
            <IconSelect style={{ width: '100px' }} selectIconCallBack={(iconName: string) => {
                setIconName(iconName)
            }} />
            <Button type="primary">新增</Button>
            <Button onClick={openOrCloseAll}>{open ? '展开' : '折叠'}</Button>
            <Table
                rowKey="id"
                bordered={true}
                columns={columns}
                dataSource={data}
                expandedRowKeys={expKeys}
                // 单个展开或关闭，操作数组
                onExpand={(b, r) => {
                    const newExp: any = b ? [...expKeys, r.id] : expKeys.filter(i => i !== r.id);
                    setExpKeys(newExp);
                }}
            />
            <Modal title="新增" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="节点类型"
                        name="type"
                    >
                        <Radio.Group>
                            <Radio value={1}>目录</Radio>
                            <Radio value={2}>菜单</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="节点名称"
                        name="name"
                        rules={[{ required: true, message: '请输入节点名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="节点图标"
                        name="name"
                        rules={[{ required: true, message: '请选择节点图标' }]}
                    >
                        <Popover placement="leftBottom" content={<IconSelect style={{ width: '100px' }} selectIconCallBack={(iconName: string) => {
                            setIconName(iconName)
                        }} />}>
                            <Input value={iconName} placeholder="点击选择图标" prefix={<MyIcon type={`icon-${iconName}`} />} readOnly style={{}}>
                            </Input>
                        </Popover>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default MenuManage