import React from 'react'
import styles from './RealEstate.module.css'
import Assets from '@/assets'
const MidleOptions = () => {
    return (
        <div className={styles.MidleOptions}>
            <div className={styles.MidleOptionsContainer}>
                <div className={styles.MidleOptionsCardContent}>
                    <div className={styles.MidleOptionsCardTitle}>Courses</div>
                    <div className={styles.MidleOptionsCarddiscription}>Discover tailored courses designed to elevate your Aircall proficiency. From beginner basics to advanced techniques, unlock the skills you need to excel in leveraging Aircall's powerful features.</div>
                    <div>
                        <button className={styles.MidleOptionsButton}>See More</button>
                    </div>
                </div>
                <div>
                    <img className={styles.MidleOptionsCardImage} src={Assets.Images.MiddleOptionCard1} />
                </div>
            </div>

            <div className={`${styles.MidleOptionsContainer} ${styles.reverseFlex}`}>
                <div className={styles.MidleOptionsCardContent}>
                    <div className={styles.MidleOptionsCardTitle}>Learning Paths</div>
                    <div className={styles.MidleOptionsCarddiscription}>Unlock your potential with curated learning paths and certifications tailored to elevate your proficiency in Aircall, mastering organisational and communication solutions.</div>
                    <div>
                        <button className={styles.MidleOptionsButton}>See More</button>
                    </div>
                </div>
                <div>
                    <img className={styles.MidleOptionsCardImage} src={Assets.Images.MiddleOptionCard2} />
                </div>
            </div>


            <div className={styles.MidleOptionsContainer}>
                <div className={styles.MidleOptionsCardContent}>
                    <div className={styles.MidleOptionsCardTitle}>Tutorials</div>
                    <div className={styles.MidleOptionsCarddiscription}>Explore our educational videos, designed exclusively for our customers, offering expert tips and insights to optimize your communication experience.</div>
                    <div>
                        <button className={styles.MidleOptionsButton}>See More</button>
                    </div>
                </div>
                <div>
                    <img className={styles.MidleOptionsCardImage} src={Assets.Images.MiddleOptionCard3} />
                </div>
            </div>


        </div>
    )
}

export default MidleOptions
