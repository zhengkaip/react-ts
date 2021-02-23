/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Style from './App.module.scss'
import { Menu, Button, Breadcrumb, Tag } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { RouteConfig } from 'react-router-config';
import { routeConfig as RouteConfigArr } from '@/router/route.config'
import { MyMenu } from '@/components'
import { RouteModel } from '@/router/route.config'
import { TransferPage } from '@/view'
import { useLocation, Route } from 'react-router-dom'

export interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}
export interface SelectInfo extends MenuInfo {
    selectedKeys?: React.Key[];
}

export function App({ route }: RouteConfig) {
    const location = useLocation()
    let router = new Route(route);
    console.log(router)
    const [openKeys, setOpenKeys] = React.useState(['/system']);
    const rootSubmenuKeys = ['index', 'sub1', 'sub2', 'sub4'];
    const onOpenChange = (keys: any[]) => {
        const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const [collapsed, setCollapsed] = React.useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };
    const currentLinK = 1
    const routes = RouteConfigArr[0].routes as RouteModel[]
    const selectMenu = ({ item, key, keyPath, selectedKeys, domEvent }: SelectInfo) => {
        debugger
        console.log(key)
    }
    return (
        <div className={Style.App}>
            <Menu
                className="sideMenu"
                theme="dark"
                selectedKeys={[location.pathname]}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                inlineCollapsed={collapsed}
                onSelect={selectMenu}
            >
                {
                    routes.map((v, index) => {
                        return MyMenu(v)
                    })
                }
            </Menu>
            <div className="left-content">
                <div className="header">
                    <div className="flex">
                        <Button onClick={toggleCollapsed}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Application Center</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Application List</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="flex login">
                        <span>用户名</span>
                        <span>退出登录</span>
                    </div>
                </div>
                <div className="tagWrap">
                    <Tag>首页</Tag>
                    <Tag color={currentLinK === 1 ? 'blue' : ''} closable>
                        Tag 2
                    </Tag>
                </div>
                <div className={Style.content}>
                    <TransferPage route={route}></TransferPage>
                </div>
            </div>
        </div >
    );
}

