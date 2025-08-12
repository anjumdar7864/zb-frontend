import React from "react";
import styles from './Careers.module.css'
import Assets from "@/assets";

const CareersBest = () => {
    const statsData = [
        {
            image: "/images/aircallees.jpg", // Replace with actual image path
            value: "800+",
            label: "Aircallees",
        },
        {
            image: "/images/offices.jpg", // Replace with actual image path
            value: "8",
            label: "Offices",
        },
        {
            image: "/images/nationalities.jpg", // Replace with actual image path
            value: "35",
            label: "Nationalities",
        },
        {
            image: "/images/raised.jpg", // Replace with actual image path
            value: "226M$",
            label: "Raised since 2015",
        },
    ];

    return (
        <div>
            <div className={styles.BestContainer}>
                <h2 className={styles.BestTitle}>Be the best version of yourself</h2>
                <p className={styles.BestSubtitle}>
                    If you want to learn, grow, influence or lead, we welcome people at any
                    stage of their working lives.
                </p>
                <p className={styles.BestText}>
                    Whatever your background, wherever you're from, however you work best – we will
                    celebrate what makes you, you.
                </p>
                <p className={styles.BestText}>
                    We believe in equality, and inclusion for people of all origins, identities, and
                    backgrounds. This is core to the Aircall journey and mission. We will continually
                    challenge ourselves to ensure we live up to our ambitions regarding D,E&I.
                </p>
                <button className={styles.BestButton}>Learn More</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.MapContainer}>
                    <div className={styles.MapChild}>
                        <img src={Assets?.Images?.CareersMap} width={"100%"} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", alignItems: "center", paddingLeft: "12px" }} className={styles.MapChild}>
                        <div style={{ height: "fit-content", display: "flex", flexDirection: "column", gap: "24px" }}>
                            <div className={styles.mapContent}>
                                <div className={styles.mapContentTitle}>Our culture is rooted in our mission :</div>
                                <div className={styles.mapContentDis}>
                                    Here, great people trust one another and thrive together. Our
                                    work is built on powerful connections, empowering our team
                                    to share, listen and speak up.
                                </div>
                            </div>
                            <div className={styles.mapContent}>
                                <div className={styles.mapContentTitle}>Our culture is rooted in our mission :</div>
                                <div className={styles.mapContentDis}>
                                    Here, great people trust one another and thrive together. Our
                                    work is built on powerful connections, empowering our team
                                    to share, listen and speak up.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: "95px" }}>
                <div className={styles.growContainer}>
                    <div className={styles.imgContainerBottom}>
                        <img src={Assets.Images.CareersBAckgroundsec} />
                    </div>

                    <div className={styles.growContant}>
                        <div className={styles.growContantLeft}>
                            <div>
                                <img src="./icons/Brand-logo.svg" alt="ZeitBlast" />
                            </div>
                            <div className={styles.grwoTitle}>
                                Grow with us
                            </div>
                            <div className={styles.grwoDis}>
                                Our mission is to empower professionals to have richer
                                conversations by providing a cloud-based voice
                                solution. We are constantly moving forward. You will
                                help us grow, and you will grow with us too: Aircall is a
                                place for those seeking the opportunity to push
                                themselves to new heights by developing new skills.
                            </div>
                            <div className={styles.grwoDisFooter}>
                                Now is an amazing time to be part of our team
                                and the journey we’re on. Make the right call.
                            </div>
                        </div>
                        <div className={styles.growContantRight}>
                            <div className={styles.BestCardsContainer}>
                                <div className={styles.BestCardsContainerLeft}  >
                                    <div  className={styles.BestCard}>
                                        <img src={Assets.Images.growRight1}  className={styles.BestImage} />
                                        <div className={styles.BestOverlay}>
                                            <p className={styles.BestValue}>800+</p>
                                            <p className={styles.BestLabel}>Aircallees</p>
                                        </div>
                                    </div>
                                    <div  className={styles.BestCard}>
                                        <img src={Assets.Images.growRight2}  className={styles.BestImage} />
                                        <div className={styles.BestOverlay}>
                                            <p className={styles.BestValue}>8</p>
                                            <p className={styles.BestLabel}>Offices</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.BestCardsContainerRight}>
                                    <div  className={styles.BestCard}>
                                        <img src={Assets.Images.growRight3}  className={styles.BestImage} />
                                        <div className={styles.BestOverlay}>
                                            <p className={styles.BestValue}>35</p>
                                            <p className={styles.BestLabel}>Nationalities</p>
                                        </div>
                                    </div>
                                    <div  className={styles.BestCard}>
                                        <img src={Assets.Images.growRight4}  className={styles.BestImage} />
                                        <div className={styles.BestOverlay}>
                                            <p className={styles.BestValue}>226M$</p>
                                            <p className={styles.BestLabel}>Raised since 2015</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default CareersBest;
