import React from 'react'
import loading from '@/assets/images/loading.gif'
import Style from './loading.module.scss'

export const Loading = () => {
    return (
        <img className={Style['loading-img']} src={loading} alt="" />
    )
}