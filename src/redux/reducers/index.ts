import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import routeReducer from './routeList'
import tokenReducer from './token'

export default combineReducers({
    routeReducer,
    tokenReducer,
    routing: routerReducer
})