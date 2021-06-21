import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.scss';
import Routers from '@/router/index'
import { Loading } from '@/components'

const newReactDOM = async () => {
    ReactDOM.render(
        <Routers></Routers>
        ,
        document.getElementById('root')
    );
}

newReactDOM()
