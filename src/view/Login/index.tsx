import React from 'react';
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const setAuthed = () => {
        localStorage.setItem('authed', 'true')
        history.push({ pathname: '/index' })
    }
    return (
        <div className="content">
            <h5 onClick={setAuthed}>登录页</h5>
        </div>
    )
}
export default Login