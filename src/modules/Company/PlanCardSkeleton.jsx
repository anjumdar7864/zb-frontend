import React from 'react'
import styles from "./CompanyA.module.css";
import Skeleton from '@mui/material/Skeleton';
const PlanCardSkeleton = () => {
  return (
    <div className={styles.card}  >
    <div className={styles.cardLeftContainer}>
                <div  className={styles.card_title}><Skeleton  animation="wave" style={{width:"90px"}}/></div>
                <div >
                    <div  className={styles.cardPriceSmall}><Skeleton  animation="wave" style={{width:"50px"}}/></div>
                    <div >
                        {" "}
                        <span className={styles.cardPrice}><Skeleton  animation="wave" style={{width:"130px" , height:"40px"}}/></span>{" "}
               
                    </div>
           
                </div>

                <div className={styles.cardBottomLayout}>
                    <div>
                        <div style={{ marginBottom: "10px" }} className={styles.card_price_discount}>
                        <Skeleton  animation="wave" style={{width:"250px"}}/>
                        </div>
                        <div style={{ marginBottom: "10px" }} className={styles.card_price_discount}>
                        <Skeleton  animation="wave" style={{width:"300px" , height:"47px"}}/>
                        </div>
                    </div>
                </div>
           
            </div>
            <div style={{flexGrow:1}} className={styles.cardRightContainer}>
            <div>
                    <div  className={styles.cardShortDis}>
                    <Skeleton  animation="wave" style={{width:"60%"}}/>
                    </div>
                    <div style={{marginTop:"80px"}} className={styles.cardList}>
                
                    <Skeleton  animation="wave" style={{width:"80%" , margin:"10px 0px"}}/>
                    <Skeleton  animation="wave" style={{width:"70%" , margin:"10px 0px"}}/>
                    <Skeleton  animation="wave" style={{width:"50%" , margin:"10px 0px"}}/>
                    <Skeleton  animation="wave" style={{width:"70%" , margin:"10px 0px"}}/>
                    <Skeleton  animation="wave" style={{width:"70%" , margin:"10px 0px"}}/>

                </div>
                </div>
            </div>
    </div>
  )
}

export default PlanCardSkeleton
