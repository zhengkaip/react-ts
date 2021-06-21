import React from 'react';
import renderRoutes from '@/router/RouteConfig'
import { RouteConfig } from 'react-router-config';
import { IMenuListProps } from '../App'

const TransferPage = ({ routes }: IMenuListProps) => {
    console.log(new Date().getTime())
    return (
        <>
            {renderRoutes({ routes })}
        </>
    )
}

const MyComponent = React.memo(TransferPage);
export default MyComponent