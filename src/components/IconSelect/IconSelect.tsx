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
export const IconSelect = ({ selectIconCallBack }: IconSelectProps) => {
    const [iconList, setIconList] = useState(icons)
    const searchIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setIconList(icons.filter(icon => icon.includes(value)))
    }
    return (
        <div>
            <Input onChange={searchIcon} />
            <div className={Style['icon-list']}>
                {
                    iconList.map(icon => {
                        return (
                            <div onClick={() => {
                                selectIconCallBack(icon)
                            }}>
                                <MyIcon key={icon} type={`icon-${icon}`} style={{ maxHeight: '30px', maxWidth: '16px' }} />
                                <span className='icon-name'>{icon}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
