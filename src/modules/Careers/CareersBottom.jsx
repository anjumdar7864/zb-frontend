import React from 'react'
import styles from './Careers.module.css'
import Assets from '@/assets'
import { FaHome, FaHeart, FaBriefcase, FaUtensils, FaDumbbell, FaUsers, FaGift, FaBus, FaPiggyBank, FaStar } from "react-icons/fa";
const CareersBottom = () => {
    const benefits = [
        { icon: Assets.Icons.careersBottomIcon1, title: "Food Allowance" },
        { icon: Assets.Icons.careersBottomIcon2, title: "Competitive Salary" },
        { icon: Assets.Icons.careersBottomIcon3, title: "Medical Insurance" },
        { icon: Assets.Icons.careersBottomIcon4, title: "Competitive Salary" },
        { icon: Assets.Icons.careersBottomIcon5, title: "Flexible remote policy" },
        { icon: Assets.Icons.careersBottomIcon6, title: "Retirement Savings Plan" },
        { icon: Assets.Icons.careersBottomIcon7, title: "Outings & Events" },
        { icon: Assets.Icons.careersBottomIcon8, title: "Fitness Fund" },
        { icon: Assets.Icons.careersBottomIcon9, title: "Commuter Benefits" },
        { icon: Assets.Icons.careersBottomIcon10, title: "Referral Bonus" },
    ];

    return (
        <div>
            <div style={{ backgroundImage: `url(${Assets.Images.careersBottomBack})` }} className={styles.BottomContainer}>
                <div className={styles.bottomTitle}>Perks & Benefits</div>
                <div className={styles.bottomDis}>Please note that benefits necessarily vary somewhat by country and location.</div>
                <div className={styles.BottomGridContainer}>
                    {
                        benefits.map((data, i) => {
                            return (
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "fit-content", display: "flex", flexDirection: "column", alignItems: "center" , gap:"16px" }}>
                                        <div className={styles.cardIcons}>
                                            <img src={data.icon} />
                                        </div>
                                        <div className={styles.cardTitle}>
                                            {data.title}
                                        </div>
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

export default CareersBottom
