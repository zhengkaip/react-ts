import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TOKEN } from '@/constrants/action/token'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const setAuthed = () => {
        localStorage.setItem('authed', 'true')
        dispatch({
            type: ADD_TOKEN,
            token: new Date().getTime()
        })
        history.push({ pathname: '/index' })
    }
    return (
        <div className="content">
            <h5 onClick={setAuthed}>登录页</h5>
        </div>
    )
}
export default Login