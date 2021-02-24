import { ADD_ROUTE, DEL_ROUTE } from '@/constrants/action/routeList'

export interface routeItem {
    key: string,
    name: string
}

interface routeInfo {
    type: string,
    item: routeItem
}

const routeReducer = (state: routeItem[] = [], action: routeInfo): Array<routeItem | undefined> => {
    switch (action.type) {
        case ADD_ROUTE:
            if (action.item.name !== '首页') {
                for (let item of state) {
                    if (item.key === action.item.key) {
                        return state
                    }
                }
                return [...state, action.item]
            } else {
                return state
            }
        case DEL_ROUTE:
            return state.filter((item: routeItem) => {
                return item.key !== action.item.key
            })
        default:
            return state
    }
}
export default routeReducer