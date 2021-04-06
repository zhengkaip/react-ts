import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Input, Radio, Popover, TreeSelect, Switch, InputNumber } from 'antd'

import MyIcon from '@/icon'
import { IconSelect, MyTreeNode } from '@/components'

interface formDataState {
    type: number,
    isShow: boolean,
    iFrame: number,
    pId?: number
}

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

const pNodeData = [{ "id": 0, "type": 1, "label": "顶级目录", "len": 1, children: [{ "id": 1, "type": 1, "label": "系统管理", "len": 7, "children": [{ "id": 259, "type": 1, "label": "test2", "len": 1, "children": [{ "id": 273, "type": 1, "label": "123", "len": 1 }] }] }, { "id": 51, "type": 1, "label": "投资研究", "len": 4 }, { "id": 56, "type": 1, "label": "投资顾问", "len": 11 }, { "id": 61, "type": 1, "label": "运营管理", "len": 9 }, { "id": 79, "type": 1, "label": "交易员", "len": 5 }, { "id": 86, "type": 1, "label": "日志管理", "len": 3 }, { "id": 98, "type": 1, "label": "投资大脑", "len": 2 }, { "id": 274, "type": 1, "label": "123", "len": 0 }, { "id": 251, "type": 1, "label": "渠道管理", "len": 4 }] }]

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
            render: (row: any) => (
                <Space size="middle">
                    <span onClick={() => {
                        setFormData(Object.assign({}, formData, { pId: row.id }))
                        addMenu()
                    }}>添加</span>
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
    const [formData, setFormData] = useState<formDataState>({
        type: 1,
        isShow: true,
        iFrame: 0,
    })
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


    return (
        <>
            <Button type="primary" onClick={addMenu}>新增</Button>
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
                    initialValues={formData}
                >
                    <Form.Item
                        label="节点类型"
                        name="type"

                    >
                        <Radio.Group onChange={(e) => {
                            setFormData(Object.assign({}, formData, { type: e.target.value }))
                        }}>
                            <Radio value={1}>目录</Radio>
                            <Radio value={2}>菜单</Radio>
                            <Radio value={3}>按钮</Radio>
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
                        label="上级节点"
                        name="pId"
                        rules={[{ required: true, message: '请选择上级节点' }]}
                    >
                        <TreeSelect style={{ width: '100%' }}>
                            {
                                MyTreeNode(pNodeData)
                            }
                        </TreeSelect>
                    </Form.Item>
                    {
                        formData.type !== 3 &&
                        (
                            <>
                                <Form.Item
                                    label="是否显示"
                                    name="isShow"
                                    rules={[{ required: true, message: '请选择是否显示' }]}
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                                <Form.Item
                                    label="节点图标"
                                    name="icon"
                                    rules={[{ required: true, message: '请选择节点图标' }]}
                                >
                                    <Popover content={<IconSelect style={{ width: '380px' }} selectIconCallBack={(iconName: string) => {
                                        setIconName(iconName)
                                        form.setFieldsValue({ icon: iconName });
                                        console.log(iconName)
                                    }} />} trigger="focus">
                                        <Input value={iconName} placeholder="点击选择图标" prefix={<MyIcon type={`icon-${iconName}`} />} readOnly>
                                        </Input>
                                    </Popover>
                                </Form.Item>
                            </>
                        )
                    }
                    {
                        formData.type === 2 ? (
                            <Form.Item
                                label="菜单类型"
                                name="iFrame"
                                rules={[{ required: true, message: '请选择菜单类型' }]}
                            >
                                <Radio.Group onChange={(e) => {
                                    setFormData(Object.assign({}, formData, { iFrame: e.target.value }))
                                }}>
                                    <Radio value={0}>内部组件</Radio>
                                    <Radio value={1}>外部链接</Radio>
                                </Radio.Group>
                            </Form.Item>
                        ) : ''
                    }
                    {
                        formData.type !== 3 &&
                        <Form.Item
                            label="节点路由"
                            name="path"
                            rules={[{ required: true, message: '请输入节点路由' }]}
                        >
                            <Input />
                        </Form.Item>
                    }
                    {
                        formData.type === 2 ? (
                            <Form.Item
                                label="组件路径"
                                name="component"
                                rules={[{ required: true, message: '请输入组件路径' }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : ''
                    }
                    <Form.Item
                        label="节点排序"
                        name="sort"
                        rules={[{ required: true, message: '请输入节点排序' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    {
                        formData.type === 3 && <Form.Item
                            label="权限标识"
                            name="perms"
                            rules={[{ required: true, message: '请输入权限标识' }]}
                        >
                            <Input />
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </>
    )
}
export default MenuManage