import React from 'react'
import styles from './RealEstate.module.css'
import Assets from '@/assets'
import { MdArrowForwardIos } from 'react-icons/md'
const RealEstateBottom = () => {

    const listData = [
        {
            title: "Discover ZeitBlast",
            image: Assets.Images.realAstateBottom1
        },
        {
            title: "Fix broken conversation with customers...",
            image: Assets.Images.realAstateBottom2
        },
        {
            title: "Product Spotlight winter Edition",
            image: Assets.Images.realAstateBottom3
        }
    ]
    return (
        <div className={styles.bottom}>
            <div className={styles.imgContainer}>
                <img className={styles.topBackground} src={Assets.Images.realEstateBottom} width={"100%"} height={"100%"} />

            </div>

            <div className={styles.bottomBody}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className={styles.bottomSubTitle}>What’s on</div>
                    <div className={styles.bottomTitle}>Feature Spotlights and<br /> Events at ZeitBlast</div>
                    <div className={styles.bottomParagraph}>ZeitBlast Learning Lab is the place for you to refine your skills,<br /> maximising your communication efficiency.</div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className={styles.bottomButton}><span><img src={Assets.Icons.realEstateRocket} /></span> <span>View catalogue</span><MdArrowForwardIos /></button>
                    </div>
                </div>

                <div className={styles.bottomCardContainer}>
                    {
                        listData.map((data) => {
                            return (
                                <div className={styles.bottomCard}>
                                    <div className={styles.bottomCardImage}>
                                        <img className={styles.bottomCardImage} src={data.image} />
                                    </div>
                                    <div className={styles.bottomCardTitle}>{data.title}</div>
                                    <div>
                                        <button className={styles.bottomCardButton}>See More</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RealEstateBottom
