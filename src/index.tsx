import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.scss';
import reportWebVitals from './reportWebVitals';
import Routers from '@/router/index'
import { routeConfig, RouteModel } from "@/router/route.config"
import { Loading } from '@/components'

const newReactDOM = async () => {
    ReactDOM.render(
        <Loading />,
        document.getElementById('root')
    );
    const config = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(routeConfig)
        }, 500)
    })
    ReactDOM.render(
        // <React.StrictMode>
        //     <App />
        // </React.StrictMode>,
        <Routers routes={config as RouteModel[]}></Routers>
        ,
        document.getElementById('root')
    );
}

newReactDOM()



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
