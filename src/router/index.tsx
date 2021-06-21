import { HashRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'

import Store from '@/redux'

import renderRoutes from './RouteConfig'
import { RouteModel } from './route.config'

import Login from '@/view/Login'
import ErrorPage from '@/view/ErrorPage'
import ChildRoue from './childRoue'
import App from '@/view/App'
// import Home from '../view/Home'


interface RouterConfigProps {
    routes: RouteModel[]
}


const RouterConfig = () => {
    return (
        <Provider store={Store}>
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={Login}>
                    </Route>
                    <Route path="/">
                        <ChildRoue />
                    </Route>
                    <Route path="" component={ErrorPage}>
                    </Route>
                </Switch>
                {/* {renderRoutes({ routes: props.routes })} */}
            </HashRouter>
        </Provider>
    )
};

export default RouterConfig;