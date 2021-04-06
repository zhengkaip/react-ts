import React, { useState, CSSProperties } from 'react';

import { Input } from 'antd'
import MyIcon from '@/icon/index'
import icons from './requireIcons'

import Style from './IconSelect.module.scss'


interface callBack {
    (iconName: string): void
}

interface IconSelectProps {
    selectIconCallBack: callBack,
    style: CSSProperties
}
export const IconSelect = ({ selectIconCallBack, style }: IconSelectProps) => {
    const [iconList, setIconList] = useState(icons)
    const searchIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setIconList(icons.filter((icon: string) => icon.includes(value)))
    }
    return (
        <div style={style} >
            <Input onChange={searchIcon} />
            <div className={Style['icon-list']}>
                {
                    iconList.map((icon: string) => {
                        return (
                            <div key={icon} onClick={() => {
                                selectIconCallBack(icon)
                            }}>
                                <MyIcon type={`icon-${icon}`} style={{ maxHeight: '30px', maxWidth: '16px' }} />
                                <span className='icon-name'>{icon}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
}
