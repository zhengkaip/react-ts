import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import routeReducer from './routeList'

export default combineReducers({
    routeReducer,
    routing: routerReducer
})