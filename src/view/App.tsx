/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Style from './App.module.scss'
import { Menu, Button, Breadcrumb, Tag } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { RouteConfig } from 'react-router-config';
import { activeMenuOptions, renderMenuItem, MyBreadcrumb, returnMenuNode } from '@/components'
import TransferPage from '@/view/TransferPage'
import { contentRouter, RouteModel } from '@/router/route.config'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '@/redux'
import { ADD_ROUTE, DEL_ROUTE } from '@/constrants/action/routeList'
import { routeItem } from '@/redux/reducers/routeList'

export interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}
export interface SelectInfo extends MenuInfo {
    selectedKeys?: React.Key[];
}

export default function App({ route }: RouteConfig) {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const pathname = location.pathname
    const [openKeys, setOpenKeys] = useState<Array<string>>([]);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<Array<string>>([]);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<string>>([]);
    const [currentMenu, setCurrentMenu] = useState<returnMenuNode | undefined>();
    useEffect(() => {
        let menuOptions = activeMenuOptions(pathname)
        setDefaultSelectedKeys(menuOptions.selectedKeys)
        setDefaultOpenKeys(menuOptions.openKeys)
        setCurrentMenu(menuOptions.currentMenu)
        setOpenKeys(menuOptions.openKeys)
        setSelectedKeys(menuOptions.selectedKeys)
        if (menuOptions.currentMenu) {
            dispatch({
                type: ADD_ROUTE,
                item: menuOptions.currentMenu
            })
        }
    }, [pathname, dispatch])
    const rootSubmenuKeys: string[] = contentRouter.map((item: RouteModel) => {
        return item.path
    })

    const onOpenChange = (keys: React.Key[]) => {
        let latestOpenKey = keys.find(key => openKeys.indexOf(key as string) === -1);
        latestOpenKey = latestOpenKey ? latestOpenKey : ''
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
            setOpenKeys(keys as Array<string>);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey as string] : []);
        }
    };

    let routeList: routeItem[] = useSelector((state: RootStore) => state.routeReducer)

    useEffect(() => {
        if (routeList.length) {
            history.push(routeList[routeList.length - 1].key)
        } else {
            history.push('/index')
        }
    }, [routeList, history])

    const closeTag = (e: React.MouseEvent<HTMLElement>, item: routeItem) => {
        dispatch({
            type: DEL_ROUTE,
            item: item
        })
    }

    return (
        <div className={Style.App}>
            <Menu
                className={Style.sideMenu}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                inlineCollapsed={collapsed}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
            >
                {
                    renderMenuItem()
                }
            </Menu>
            <div className={Style.leftContent}>
                <div className={Style.header}>
                    <div className={Style.flex}>
                        <Button onClick={toggleCollapsed}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/index">首页</Link>
                            </Breadcrumb.Item>
                            {
                                currentMenu !== undefined && MyBreadcrumb(currentMenu)
                            }
                        </Breadcrumb>
                    </div>
                    <div className={`${Style.flex} login`}>
                        <span>用户名</span>
                        <span>退出登录</span>
                    </div>
                </div>
                <div className={Style.tagWrap}>
                    <Tag color={pathname === '/index' ? 'blue' : ''}><Link to='/index'>首页</Link></Tag>
                    {
                        routeList.map(item => {
                            return (
                                <Tag key={item.key} color={pathname === item.key ? 'blue' : ''} closable onClose={(e) => closeTag(e, item)}>
                                    <Link to={item.key}>{item.name}</Link>
                                </Tag>
                            )
                        })
                    }
                </div>
                <div className={Style.content}>
                    <TransferPage route={route}></TransferPage>
                </div>
            </div>
        </div >
    );
}

