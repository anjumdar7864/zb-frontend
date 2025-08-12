import Components from '@/components'
import React from 'react'
import styles from './RealEstate.module.css'
import Assets from '@/assets'
import MidleBody from './MidleBody'
import MidleOptions from './MidleOptions'
import RealEstateBottom from './RealEstateBottom'
const RealEstate = () => {
    return (
        <div>
            <Components.Common.HeaderSite />

            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <img className={styles.topBackground} src={Assets.Images.careersBackground} width={"100%"} height={"100%"} />

                </div>
                <div className={styles.topBody}>
                    <div className={styles.topContent}>
                        <div className={styles.TopSubTitle}>Welcome to</div>
                        <div className={styles.TopTitle}>ZeitBlast Learning Lab</div>
                        <div className={styles.TopParagraph}>ZeitBlast Learning Lab is the place for you to refine your skills, maximising your communication efficiency.</div>
                        <div>
                            <button className={styles.TopButton}> View catalogue</button>
                        </div>
                    </div>
                    <div>
                        <img className={styles.topImage} src={Assets.Images.realAstateTop} />
                    </div>
                </div>
                <div className={styles.topBottomWhite}>

                </div>
            </div>
            <MidleBody />
            <MidleOptions />
            <RealEstateBottom />
            <Components.Common.Footer />

        </div>
    )
}

export default RealEstate
