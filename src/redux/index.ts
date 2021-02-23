import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunkMiddleware from "redux-thunk"

import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

export type RootStore = ReturnType<typeof rootReducer>

let middleware = []
if (process.env.NODE_ENV === 'production') {
    middleware = [thunkMiddleware]
} else {
    middleware = [thunkMiddleware, createLogger]
}
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
export default Store