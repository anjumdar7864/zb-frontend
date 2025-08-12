import React from 'react'
import styles from './Notification.module.css'
import { FiSearch } from 'react-icons/fi';
import TableComponent from './NotificationTable';
import { useNavigate } from 'react-router-dom';
const Notification = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div
                //  className={styles.InboxStyledTop}
                className='pageHeaderLayout'
            >
                <div className={styles.InboxStyledTopLeft}>
                    <h1
                        //  className={styles.InboxStyledTopLeftH1}
                        className='body1SemiBold textPrimeryColor'
                    >Notification</h1>
                </div>


            </div>
            <div className={styles.filterContainer}>
                <div>

                    <div className={styles.filter_right}>
                        <div className={styles.searchContainer}>
                            <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
                            <form onSubmit={(e) => {
                                e.preventDefault(); // ✅ Prevent page refresh
                            }} autoComplete="off">

                                <input
                                    autoComplete="off"
                                    className={styles.SearchInput}
                                  
                                 
                                    type="text"
                                    placeholder="Search..."
                                />
                            </form>
                        </div>
                    </div>


                </div>
                <div>
                    <button onClick={()=> navigate("/notifications/create")} className=' buttonHeight primeryBackground  textWhiteColor body4Medium'>
                    Create Notification
                    </button>
                </div>
            </div>

            <TableComponent/>
        </div>
    )
}

export default Notification