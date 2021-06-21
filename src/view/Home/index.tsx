import React, { useEffect } from 'react'
import Style from './index.module.scss'
import { Table } from 'antd'
import service from '@/utils/request'

const columnsData = [
    {
        title: '组合名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '批次',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '父批次',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '下单时间',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '失败账户数',
        key: 'action',
        dataIndex: 'action',
    },
    {
        title: '待处理异常客户数',
        key: 'all',
        dataIndex: 'all',
    },
]
const tableData = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: 'sds',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: 'sds',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: 'sds',
    },
]

const Home = () => {
    const [columns, setColumns] = React.useState(columnsData)
    const [data, setData] = React.useState(tableData)
    useEffect(() => {
        service.get('brain/pValue/trendDirection')
    }, [])
    return (
        <>
            <div className={Style['section-header']}>
                <p
                    onClick={() => {
                        setColumns([])
                    }}
                >
                    运行概况
                </p>
                <p>更新时间：02-22（星期一）</p>
            </div>
            <h3 className={Style.title}>待异常处理总概况</h3>
            <div className={Style.total}>
                <h4>522</h4>
                <p className="sub-title">待异常处理客户数</p>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultCurrent: 1,
                    total: 50,
                }}
                bordered
            />
            <div className={Style['section-header']}>
                <p>今日风险预警</p>
            </div>
            <h3 className={Style.title}>风险预警</h3>
            <ul className={Style.list}>
                <li>
                    div
                    <h5>
                        1<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        9<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        1<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        9<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        9<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        1<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
                <li>
                    <h5>
                        9<span>条</span>
                    </h5>
                    <p>客户亏损数量</p>
                </li>
            </ul>
        </>
    )
}
export default Home
