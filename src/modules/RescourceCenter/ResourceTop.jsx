import React from 'react'
import styles from './ResourceCenter.module.css'
import Assets from '@/assets'
const ResourceTop = () => {
    return (
        <div className={styles.ResourceTopWraper}>
            <div className={styles.TopContainer}>
                <div>
                    <div className={styles.TopTitle}>Watch ZeitBlast videos <br />
                        & webinars on-demand</div>
                    <div className={styles.TopParagraph}>
                        How do you build an IVR? What about our Hubspot integration, how does it work? Whether you’re new to ZeitBlast or a long-time user, you can find answers to these questions and more in our library of on-demand video and webinar resources.
                    </div>
                </div>
                <div>
                    <img className={styles.TopImage} src={Assets.Images.ResourceTop} width={528} height={396} />
                </div>
            </div>
        </div>

    )
}

export default ResourceTop
