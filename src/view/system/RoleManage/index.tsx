import React from 'react';
import { Table, Button, Card } from 'antd'
import Style from './index.module.scss'

function RoleManage() {
    return (
        <div className={Style['flex-content']}>
            <div className="flex-4">
                {/* <div className="section-title">
                    <h3>角色列表</h3>
                </div> */}
                <Card title="角色列表">
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
            <div className='flex-2'>
                <div className={`${Style['flex-content']} section-title`}>
                    <h3>菜单分配</h3>
                    <Button type="primary">保存</Button>
                </div>
            </div>
        </div>
    );
}

export default RoleManage;
