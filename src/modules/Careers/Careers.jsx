import Components from '@/components'
import React from 'react'
import styles from './Careers.module.css'
import Assets from '@/assets'
import CareersLocation from './CareersLocation'
import CareersRoles from './CareersRoles'
import CareersBest from './CareersBest'
import CareersValues from './CareersValues'
import CareersBottom from './CareersBottom'
const Careers = () => {
    return (
        <div>
            <Components.Common.HeaderSite />
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <img className={styles.topBackground} src={Assets.Images.careersBackground} width={"100%"} height={"100%"} />

                </div>
                <div className={styles.topContant}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={Assets.Icons.careerIcon} alt="" />
                    </div>
                    <div className={styles.topTitle}>
                        Where voices are <br />
                        valued.
                    </div>
                    <div className={styles.discription}>
                        Great conversations are at the heart of our culture and the <br /> technology we create.
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
                        <div className={styles.topBottom}>
                            <div className={styles.jobsLeft}>
                            <img src={Assets.Images.careerTopLeftMob} className={styles.mobileImage} style={{ borderRadius: "16px" }} width={'312px'} height={'200px'} alt="" />

                                <img src={Assets.Images.CareerTopLeft} className={styles.desktopImage} style={{ borderRadius: "16px" }} width={'240px'} height={'288px'} alt="" />
                                <img src={Assets.Images.CareerstopRight} className={styles.desktopImage} style={{ borderRadius: "16px" }} width={'240px'} height={'288px'} alt="" />
                            </div>
                            <div className={styles.jobsRight}>
                                <div className={styles.jobTitle}>Jobs</div>
                                <div className={styles.jobDis}>Our mission is to empower professionals to have richer conversations by providing a cloud-based voice solution.</div>
                                <div>
                                    <button className={styles.jobButton}>See open positions </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.topBottomWhite}>

                </div>
            </div>
            <div>
                <CareersLocation />
                <CareersRoles />
                <CareersBest/>
                <CareersValues/>
                <CareersBottom/>
            </div>
            <Components.Common.Footer />
          
        </div>
    )
}

export default Careers
