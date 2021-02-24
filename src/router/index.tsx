import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import Store from '@/redux'

import renderRoutes from './RouteConfig'
import { RouteModel } from './route.config'

interface RouterConfigProps {
    routes: RouteModel[]
}


const RouterConfig = (props: RouterConfigProps) => {
    return (
        <Provider store={Store}>
            <HashRouter>
                {renderRoutes({ routes: props.routes })}
            </HashRouter>
        </Provider>
    )
};

export default RouterConfig;