import React, { useEffect, useState } from 'react';
import { RouteModel, contentRouter } from './route.config'
import { useSelector } from 'react-redux'
import { RootStore } from '@/redux'
import App from '@/view/App'
import { useHistory } from 'react-router-dom'

function traverseTree(treeArr: RouteModel[], init: RouteModel[] = []) {
    treeArr.forEach((item: RouteModel) => {
        if (item.component) {
            init.push(item)
        }
        item.routes && traverseTree(item.routes, init)
    })
    return init
}

function ChildRoue() {
    // const token: string = useSelector((state: RootStore) => state.tokenReducer)
    const token: string | null = localStorage.getItem('authed')
    const [usedRoutes, setUsedRoutes] = useState<RouteModel[]>([]);
    const history = useHistory()
    useEffect(() => {
        if (token) {
            setTimeout(() => { //  模拟异步获取菜单
                let routerList = traverseTree(contentRouter, [])
                setUsedRoutes(routerList)
            }, 500)
        } else {
            history.replace('/login')
            setUsedRoutes([])
        }

    }, [history, token]);
    return (
        // {/* { renderRoutes({ routes: usedRoutes })} */}
        usedRoutes.length ? <App routes={usedRoutes}></App> : <></>
    );
}

export default ChildRoue;
