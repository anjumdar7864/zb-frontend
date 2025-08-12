import Assets from '@/assets'
import React from 'react'
import styles from './Careers.module.css'
const CareersLocation = () => {
  const list = [
    {
      title: "Paris",
      count: 8,
      image: Assets?.Images?.CareersList1
    },
    {
      title: "Singapore",
      count: 2,
      image: Assets?.Images?.CareersList2
    },
    {
      title: "London",
      count: 15,
      image: Assets?.Images?.CareersList3
    },
    {
      title: "Berlin",
      count: 4,
      image: Assets?.Images?.CareersList4
    },
    {
      title: "New York",
      count: 10,
      image: Assets?.Images?.CareersList5
    },
  ]
  return (
    <div>
      <div className={styles.locationHeader}>
        Open positions
      </div>
      <div className={styles.locationWrapper}>
        <div className={styles.locationContainer}>
          {list?.map((item, index) => (
            <div key={`item-${index}`} className={styles.locationItem}>
              <img className={styles.locationImage} src={item?.image} alt={item?.title} />
              <div className={styles.locationTitle}>{item?.title}</div>
              <div className={styles.locationCount}>{item?.count}</div>
            </div>
          ))}
          {/* Duplicate the items for infinite scroll effect */}
          {list?.map((item, index) => (
            <div key={`item-dup-${index}`} className={styles.locationItem}>
              <img className={styles.locationImage} src={item?.image} alt={item?.title} />
              <div className={styles.locationTitle}>{item?.title}</div>
              <div className={styles.locationCount}>{item?.count}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.locationWrapperMobile}>
      {list?.map((item, index) => (
            <div key={`item-${index}`} className={styles.locationItem}>
              <img className={styles.locationImage} src={item?.image} alt={item?.title} />
              <div className={styles.locationTitle}>{item?.title}</div>
              <div className={styles.locationCount}>{item?.count}</div>
            </div>
          ))}
      </div>
    </div>

  )
}

export default CareersLocation
