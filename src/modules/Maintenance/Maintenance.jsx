import React from 'react'
import styles from './Maintenance.module.css'
import Assets from '@/assets'
import Components from '@/components'
const Maintenance = () => {
    return (
        <>
            <Components.Common.HeaderSite />
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.leftContent} >
                        <div className={styles.title}>Website is Under Maintenance</div>
                        <div className={styles.dis}>
                            Our website is currently undergoing maintenance to bring you a smoother and improved experience. We’ll be back up and running shortly—thank you for your patience!
                        </div>
                    </div>

                </div>
                <div className={styles.right}>
                    <img className={styles.Image} src={Assets.Images.maintenance} />
                </div>
            </div>
            <Components.Common.Footer />
        </>
    )
}

export default Maintenance
