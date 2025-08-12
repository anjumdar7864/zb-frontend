import React from 'react'
import styles from './ResourceCenter.module.css'

const VideoList = ({ list , title }) => {
    return (
        <div className={styles.VideoListWraper}>
            <div className={styles.VideoListTitle}>{title}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.VideoListContainer}>
                    {
                        list.map((item, index) => (
                            <div className={styles.productItemCard} key={index}>
                                <div className={styles.ProductNewsTop}>
                                    <img className={styles.ProductNewsImage} src={item.image} />
                                </div>
                                <div className={styles.ProductNewsBottom}>
                                    <div className={styles.ProductNewsDuration}>{item.duration}</div>

                                    <div className={styles.ProductItemTitle} >{item.title}</div>
                                    <div className={styles.ProductItemDiscription}>{item.discription}</div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoList
