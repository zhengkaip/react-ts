import { HashRouter, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'

import Store from '@/redux'
import { routeConfig } from "./route.config"

import renderRoutes from './RouteConfig'


const RouterConfig = () => {
    return (
        <Provider store={Store}>
            <HashRouter>
                <Switch>
                    {renderRoutes({ routes: routeConfig })}
                </Switch>
            </HashRouter>
        </Provider>
    )
};

export default RouterConfig;