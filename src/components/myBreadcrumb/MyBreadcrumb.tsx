import React from 'react'
import { returnMenuNode } from '../myMenu'
import { Breadcrumb } from 'antd';


export const MyBreadcrumb = (currentMenu: returnMenuNode): React.ReactNode => {
    return (
        <>
            {
                currentMenu.parent && MyBreadcrumb(currentMenu.parent)
            }
            {
                currentMenu.name !== '首页' && <Breadcrumb.Item>{currentMenu.name}</Breadcrumb.Item>
            }
        </>
    )
}