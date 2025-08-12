import React, { useEffect, useState } from 'react'
import styles from './Flags.module.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { DeleteModal } from '@/components/common'






const FlagsTable = ({ primeryColr, seconderyColr, array, title = 'title', handleClick, id, searchItem }) => {

    const [selected, setSelected] = useState(null)
    const [colaps, setColaps] = useState(false)
    const [pageSize, setPageSize] = useState(12)
    const [currentPage, setCurrentPage] = useState(1);
    const [filterdData , setFilteredData] = useState([])

    const loadMoreData = () => {
        if (filterdData.length > currentPage * pageSize) {
            setCurrentPage(currentPage + 1);
        }

    };




useEffect(() => {
    // Debounce timeout to improve performance during rapid input changes
    const timeout = setTimeout(() => {
      const filtered = array.filter((item) => {
        const searchText = searchItem.toLowerCase(); // Convert search input to lowercase
        return (
          String(item._id).toLowerCase().includes(searchText) ||
          String(item.deliveredPercentage).includes(searchText) ||
          String(item.companyName).toLowerCase().includes(searchText) ||
          String(item.organizationName).toLowerCase().includes(searchText) ||
          String(item.firstName).toLowerCase().includes(searchText) ||
          String(item.lastName).toLowerCase().includes(searchText)
        );
      });

      setFilteredData(filtered);
    }, 300); // Adjust debounce delay as needed

    // Cleanup the timeout
    return () => clearTimeout(timeout);
  }, [searchItem, array]);

  
    return (
        <div>
            <div className={styles.table_container}>
                <div className={styles.table_top}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "12px", color: "#777777" }}>
                        <div 
                        //  className={styles.table_title}
                         className={'body3Medium textPrimeryColor'}
                         >{title}</div> -
                        <div className='body5Medium textSecondaryColor' style={{ maxHeight: "fit-ccontent", fontWeight: 500 }}>
                            <div style={{ backgroundColor: seconderyColr, padding: "2px", borderRadius: "100%", maxWidth: "fit-content", translate: "15px" }}></div>
                            {filterdData.length}
                        </div>

                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => setColaps(!colaps)}>{colaps ? <IoIosArrowDown color='#012635' size={24} /> : <IoIosArrowUp color='#012635' size={24} />}</div>
                </div>
                <div style={{ display: colaps && "none" }} className={styles.row_container}>
                    {
                        filterdData.map((data, index) => {
                            return (
                                <div onClick={() => {
                                    if(title == "No Message Sent" ){
                                        handleClick(data, index , "No Message Sent" )

                                    }else{
                                        handleClick(data, index )

                                    }
                                    }} style={{ display: currentPage * pageSize <= index && "none", backgroundColor: data.id == id ? seconderyColr : primeryColr , overflow: "hidden" }} className={styles.table_field}>
                                    <div className='body3Medium ' style={{ color: data.id == id ? "white" : "#777777" }}>
                                        {data._id}
                                    </div>
                                    <div className='body3SemiBold textPrimeryColor' style={{  color: data.id == id ? "white" : "#012635",  }}>
                                     {title == "No Message Sent" ? "0%" : `${ Math.round(data?.deliveredPercentage)}%`}  
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end", paddingRight: "40px" }}>
                <div onClick={loadMoreData} style={{ cursor: "pointer", backgroundColor: seconderyColr, fontWeight: 500, color: "white", width: "100px", display: colaps ? "none" : array.length <= currentPage * pageSize ? "none" : "flex", justifyContent: "center", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", paddingBottom: "5px", fontSize: "12px" }}>See more</div>
            </div>
        </div>
    )
}

export default FlagsTable
