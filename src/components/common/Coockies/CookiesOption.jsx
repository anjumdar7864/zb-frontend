import React, { useState } from 'react'
import styles from './Coockies.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import Components from '@/components'
import SwitchButton from '../Switch/Switch'
import { FaMinus } from 'react-icons/fa6'
import { HiMinus } from 'react-icons/hi'

const CookiesOption = ({title , discription , handleActive}) => {
    const [hide, setHide] = useState(true)
    const [active, setActive] = useState(false)

  
    return (
        <div className={styles.OptionContainer}>
            <div className={styles.OptionTop}>
                <div style={{ display: "flex", gap: "15px" }}>
                    <div style={{ cursor: "pointer" }}>{hide ? <AiOutlinePlus onClick={() => setHide(false)} size={22} /> : <HiMinus size={22} onClick={() => setHide(true)} />}</div>
                    <div className={styles.subTitle}>{title}</div>
                </div>
                <div>
                    <SwitchButton disabled={false} active={active} row={""} handleActive={handleActive} />
                </div>
            </div>
            <div style={{ display: hide && "none" }} className={styles.OptionBottom}>
                <div style={{ maxWidth: "406px", position: "relative", margin: "auto" }} className={styles.settingDiscription}>
                   {discription}
                </div>
            </div>
        </div>
    )
}

export default CookiesOption
