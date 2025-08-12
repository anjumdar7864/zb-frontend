import React from 'react'
import styles from './RealEstate.module.css'
import Assets from '@/assets'
const MidleBody = () => {

  const dataList = [
    {
      img: Assets.Images.realAstatemid3,
      title: "Agents",
      subTitle: "Learning Path"
    },
    {
      img: Assets.Images.realAstatemid2,
      title: "Admins",
      subTitle: "Learning Path"
    },
    {
      img: Assets.Images.realAstatemid1,
      title: "Getting Started",
      subTitle: "Catalogue"
    }
  ]

  return (
    <div style={{backgroundColor:"#F7F8FC" , paddingBottom:"96px"}}>
      <div className={styles.MidleBodyTop}>
        <div className={styles.MidleSmallTitle}>Start Learning</div>
        <div className={styles.MidleTitle}>New to ZeitBlast?</div>
        <div >Choose the onboarding path relevant to your role and begin your journey with Aircall. Want to see all of our <br /> other courses? Browse the <span style={{ color: "#00BD82", textDecorationLine: "underline", cursor: "pointer" }}>All Courses page</span></div>
      </div>

      <div className={styles.MidleCardContainer}>
        {
          dataList.map((item, index) => (
            <div key={index} className={styles.MidleCard}>
              <img className={styles.MidleCardImage} src={item.img} />
              <div className={styles.MidleCardBottom}>
                <div className={styles.MidleCardTitle}>{item.title}</div>
                <div className={styles.MidleCardSubTitle}>{item.subTitle}</div>
              </div>
            </div>
          ))
        }
     
      </div>
    </div>
  )
}

export default MidleBody
