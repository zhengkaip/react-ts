import { ADD_TOKEN, DEL_TOKEN } from '@/constrants/action/token'


interface tokenInfo {
    type: string,
    token: string
}

const tokenReducer = (state: string = '', action: tokenInfo): string => {
    switch (action.type) {
        case ADD_TOKEN:
            return action.token
        case DEL_TOKEN:
            return ''
        default:
            return state
    }
}
export default tokenReducer