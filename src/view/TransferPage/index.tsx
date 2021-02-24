import React from 'react';
import renderRoutes from '@/router/RouteConfig'
import { RouteConfig } from 'react-router-config';

const TransferPage = ({ route }: RouteConfig) => {
    return (
        <>
            {renderRoutes({ routes: route.routes })}
        </>
    )
}

export default TransferPage