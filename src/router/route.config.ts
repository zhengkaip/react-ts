import React, { lazy, LazyExoticComponent } from 'react';
import App from '@/view/App'
import Home from '@/view/Home'
import Login from '@/view/Login'
import User from '@/view/system/UserManage'
import ErrorPage from '@/view/ErrorPage'
import TransferPage from '@/view/TransferPage'
import MenuManage from '@/view/system/MenuManage'
import RoleManage from '@/view/system/RoleManage'

// LazyExoticComponent<any> // lazy 异步组件时使用

// type params = '2' | '3'

// function fn<T>(str: T): T {
//     return str
// }
// fn<params>('4')

export interface RouteModel {
    path: string,
    name?: string,
    // component?: React.FC<any>,
    component?: string | React.FC<any>,
    redirect?: string,
    auth?: boolean,
    routes?: RouteModel[],
    exact?: boolean,
    icon?: string
}

export const contentRouter: RouteModel[] = [
    {
        path: "/index",
        // component: lazy( // 测试异步组件
        //     () => import('@/view/Home')
        // ),
        name: "首页",
        component: 'view/Home',
        icon: 'icon-menu',
        auth: true
    },
    {
        path: "/system",
        // component: TransferPage,
        // component: 'view/TransferPage',
        auth: true,
        name: '系统管理',
        icon: 'icon-menu',
        routes: [{
            path: "/system/menuManage",
            name: "菜单管理",
            // component: MenuManage,
            component: 'view/system/MenuManage',
            icon: 'icon-menu',
            auth: true
        }, {
            path: "/system/roleManage",
            name: "角色管理",
            // component: RoleManage,
            component: 'view/system/RoleManage',
            icon: 'icon-menu',
            auth: true
        }]
    },
    {
        path: "/system1",
        // component: TransferPage,
        // component: 'view/TransferPage',
        auth: true,
        name: '系统管理1',
        icon: 'icon-menu',
        routes: [{
            path: "/system/user",
            name: "人员管理",
            // component: User,
            component: 'view/system/UserManage',
            icon: 'icon-menu',
            auth: true
        }]
    }
]

/* 
    这里只需配置好这些路由的相互关系即可
    比如login和console是同级（兄弟），而news是console的子路由（父子）
*/
export const routeConfig: RouteModel[] = [
    {
        path: "/login",
        component: Login,
        exact: true
    },
    {
        path: "/",
        component: App,
        auth: true,
        routes: contentRouter
    },
    {
        path: '',
        component: ErrorPage
    }
]