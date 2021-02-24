import React from 'react'
import { RouteModel } from '@/router/route.config'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { contentRouter } from '@/router/route.config'
import MyIcon from '@/icon'
export interface returnMenuNode {
    key: string,
    name?: string,
    parent: null | returnMenuNode
}

const menuNode = (menuItem: RouteModel, parent: returnMenuNode | null = null): returnMenuNode => {
    return {
        name: menuItem.name,
        key: menuItem.path,
        parent: parent
    }
}


//序列化路由表
const initMenu = (config: RouteModel[], parent: returnMenuNode | null = null, menuTree: returnMenuNode[] = []): returnMenuNode[] => {
    for (let menuItem of config) {
        if (menuItem.routes) {
            //如果menuItem有children则对其children递归执行此方法，并且将当前menuItem作为父级
            initMenu(menuItem.routes, menuNode(menuItem, parent), menuTree);
        } else {
            //如果这个路由不是没有children，则是一级路由，则直接放入menuTree中
            menuTree.push(menuNode(menuItem, parent));
        }
    }
    return menuTree
    //menuTree中最终存储的是单个menuNode对象，通过判断menuNode是否有效的parent即可判断是一级路由还是子菜单下的路由
};

interface activeMenuInfo {
    currentMenu?: returnMenuNode,
    openKeys: string[],
    selectedKeys: string[]
}

const setActiveMenu = (pathname: string, menuTree: returnMenuNode[]): activeMenuInfo => {
    for (let node of menuTree) {
        //使用正则判断当前浏览器path是否与菜单项中的key相匹配，此正则可以匹配动态路径（类似于/product/:id这种传参的路由），所以即便是动态路由也能高亮对应菜单
        const isActivePath = new RegExp(`^${node.key}`).test(pathname);
        if (isActivePath) {
            const openKeys = [];
            const selectedKeys = [node.key];
            const currentMenu = node
            //判断当前菜单是否有父级菜单，如果有父级菜单需要将其展开
            while (node.parent) {
                openKeys.push(node.parent.key);
                node = node.parent;
            }
            return {
                currentMenu: currentMenu,
                openKeys: openKeys,
                selectedKeys: selectedKeys
            };
        }
    }
    //如果一个路由都没有匹配上则关闭菜单
    return {
        selectedKeys: [],
        openKeys: []
    };
}

export const activeMenuOptions = (pathname: string) => {
    const menuTree: returnMenuNode[] = initMenu(contentRouter)
    const activeMenuOption: activeMenuInfo = setActiveMenu(pathname, menuTree);

    return activeMenuOption
}

//用于渲染路由，通过递归实现任意层级渲染
export const renderMenuItem = (menuArr: RouteModel[] = contentRouter): React.ReactNode => {
    const MenuItem = Menu.Item;
    const SubMenu = Menu.SubMenu;
    // eslint-disable-next-line array-callback-return
    const ret = menuArr.map((item) => {
        if (item.routes) {
            if (item.name) {
                return (
                    <SubMenu icon={item.icon ? <MyIcon type={item.icon} style={{ color: 'rgba(255, 255, 255, 0.65)' }} /> : ''} title={item.name} key={item.path}>
                        {renderMenuItem(item.routes)}
                    </SubMenu>
                );
            } else {
                return renderMenuItem(item.routes)
            }
        } else if (item.name) {
            return (
                <MenuItem title={item.name} icon={item.icon ? <MyIcon type={item.icon} style={{ color: 'rgba(255, 255, 255, 0.65)' }} /> : ''} key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                </MenuItem>
            );
        }
    });
    return ret;
};