import React from 'react'
import styles from './ResourceCenter.module.css'
import Assets from '@/assets'

const ProductNews = () => {
    const list = [
        {
            title: "Product Spotlight - Winter Edition",
            discription: "Welcome to Aircall’s top five countdown. Introducing the 2nd Aircall product countdown series where we unveil the latest product improvements of the season!",
            duration: "Duration: 3 min 12",
            image: Assets.Images.ResourceProduct1
        },
        {
            title: "Product Spotlight - Fall Edition",
            discription: "Welcome to Aircall’s top ten countdown. Keep watching as we breeze through this quarter’s new product improvements. From small changes to big impact enhancements.",
            duration: "Duration: 3 min 12",
            image: Assets.Images.ResourceProduct2
        }
    ]
    return (
        <div className={styles.ProductNewsWraper}>
            <div className={styles.ProductNewsTitle}>Product News</div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <div className={styles.ProductNewsContainer}>
                    {
                        list.map((item, index) => (
                            <div className={styles.productItemCard} key={index}>
                                <div className={styles.ProductNewsTop}>
                                    <img className={styles.ProductNewsImage} src={item.image} />
                                </div>
                                <div className={styles.ProductNewsBottom}>
                                    <div className={styles.ProductNewsDuration}>{item.duration}</div>

                                    <div className={styles.ProductItemTitle} >{item.title}</div>
                                    <div  className={styles.ProductItemDiscription}>{item.discription}</div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductNews
