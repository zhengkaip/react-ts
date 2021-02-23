import React from 'react';
import { App, Home, Login, User, ErrorPage, TransferPage } from '@/view/index'

export interface RouteModel {
    path: string,
    name?: string,
    component?: React.SFC<any>,
    redirect?: string,
    auth?: boolean,
    routes?: RouteModel[],
    exact?: boolean
}

/* 
    这里只需配置好这些路由的相互关系即可
    比如login和console是同级（兄弟），而news是console的子路由（父子）
*/
export const routeConfig: RouteModel[] = [
    {
        path: "/",
        component: App,
        auth: true,
        routes: [
            {
                path: "/index",
                component: TransferPage,
                auth: true,
                routes: [{
                    path: "/index",
                    name: "首页",
                    component: Home,
                    auth: true
                }]
            },
            {
                path: "/system",
                component: TransferPage,
                auth: true,
                name: '系统管理',
                routes: [{
                    path: "/system/user",
                    name: "人员管理",
                    component: User,
                    auth: true
                }]
            }
        ]
    },
    {
        path: "/login",
        component: Login,
        exact: true
    },
    {
        path: '',
        component: ErrorPage
    }
]

