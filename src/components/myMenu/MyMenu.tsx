import React from 'react'
import { Menu } from 'antd';
import './myMenu.module.scss'

import { RouteModel } from '@/router/route.config'
import path from 'path'


import { Herf } from '@/components'
const { SubMenu } = Menu;

export function MyMenu(view: RouteModel): any {
    if (view.routes && view.routes.length > 0) {
        return (
            view.name ?
                <SubMenu key={view.path} title={view.name}>
                    {
                        view.path
                    }
                    {
                        view.routes.map((v) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            return MyMenu(v)
                        })
                    }
                </SubMenu> : (
                    view.routes.map((v) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        return MyMenu(v)
                    })
                )
        )
    } else {
        return (
            view.name ?
                <Menu.Item key={view.path} >
                    <Herf {...view}></Herf>
                </Menu.Item> : ''
        )
    }
}