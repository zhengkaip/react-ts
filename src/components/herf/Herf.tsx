import React from 'react';
import { useHistory } from "react-router-dom";
import { RouteModel } from '@/router/route.config'


export const Herf = (props: RouteModel) => {
    const history = useHistory();
    const herfPage = () => {
        history.push(props.path)
    }
    return (
        <div onClick={herfPage}>{props.name}</div>
    )
}