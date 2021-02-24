import { Route, Redirect, Switch } from "react-router-dom";
import { RouteConfig } from "react-router-config";

export interface IRouteConfig extends RouteConfig {
    auth?: boolean;
    routes?: IRouteConfig[];
    multipleRoutes?: IRouteConfig[];
}

/**
 * 将路由配置渲染成节点
 * @param routes switch路由列表
 * @param authed 当前账号权限
 * @param multipleRoutes 非switch路由列表，将会在Switch节点前渲染Route
 * @param extraProps 添加额外的Route props
 * @param switchProps Switch props
 */
function renderRoutes({ routes, multipleRoutes, extraProps, switchProps }: IRouteConfig) {
    let list = [];
    const mapFunc = (R: IRouteConfig[]) =>
        R.map((route, i) => (
            <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={props => {
                    const { location } = props
                    const authed = localStorage.getItem('authed')
                    if (!authed && route.auth) {
                        return (
                            <Redirect to='/login' />
                        );
                    } else if (location.pathname === '/login' && authed) {
                        return (
                            <Redirect to='/index' />
                        )
                    } else {
                        return route.render
                            ? route.render({ ...props, ...extraProps, route: route })
                            : route.component ? (
                                <route.component {...props} {...extraProps} route={route} />
                            ) : <Redirect to='/index' />;
                    }
                }}
            />
        ));
    if (routes) {
        list.push(
            <Switch {...switchProps} key={new Date().getDate()}>
                {mapFunc(routes)}
            </Switch>
        );
        // 将非Switch包裹的Route挂载到Switch节点之前
        multipleRoutes && list.unshift(...mapFunc(multipleRoutes));
        // 返回一个数组，[<Route/>,...,<Route/>,<Switch>...</Switch>]（实际元素并非如此结构，此处仅为方便说明写的伪代码），React会将数组渲染成节点

        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve('22')
        //     }, 3000)
        // })

        return list;
    }
}


export default renderRoutes