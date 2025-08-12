import React, { useState } from 'react'
import FlagsTable from './FlagsTable'
import styles from './Flags.module.css'
import CompanyInfo from './CompanyInfo'
import CompanyPopup from './CompanyPopup'
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url'
import { commonAPICall } from '@/services/api/common'
import { useSelector } from 'react-redux'
import { getAllCompanyPopupData, logOut } from '@/store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const FlagsData = ({ id, flagsList, debouncedSearchValue, typeFilter, fetchFunc }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [popupData, setPopupData] = useState()
    const [tenantId, setTenantId] = useState('')
    const [selectedNumber, setSelectedNumber] = useState('')
    const [companyName, setCompanyName] = useState("")
    const [noMessageSent, setNoMessageSent] = useState(false)
    const flagsData = useSelector((state) => state.flagsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const fetchData = async (number, tenantId) => {




        try {
            const { data, isError, message, sessionExpired } = await commonAPICall(
                REQUEST_TYPES.GET,
                `${ENDPOINTS.GET_FLAGS_DETAILS}${tenantId ? `?tenantId=${tenantId}` : ""}${number ? `&outBoundNumber=${number}` : ""}`
            );
            if (sessionExpired) {



                // sessionStorage.clear()
                dispatch(logOut());
                navigate("/Login");

            }
            if (isError) {
                return toast.error(message);
            }

            setPopupData(data)


        } catch (error) {
            console.log(error);
        }


    }


    const handleClick = (e, i, cat) => {
        console.log(e, cat, "check e")
        if (cat == "No Message Sent") {
            setNoMessageSent(true)
        }

        setOpenPopup(true)
        if (e?.tenantId) {
            setTenantId(e?.tenantId)

        } else {
            setTenantId(flagsList?._id)
        }
        setCompanyName(e?.companyName)
        if (id) {
            fetchData(e?._id, id)

        } else {
            fetchData(e?._id, e?.tenantId)

        }
        setSelectedNumber(e?._id)

    }
    const refreshDetails = (selectedNumber, tenantId, noMessageSent) => {
        if (noMessageSent) {
            setOpenPopup(false)

            fetchFunc()

        } else {
            fetchData(selectedNumber, tenantId)

        }
    }

    return (
        <div className={styles.grid_layout}>
            <div style={{ display: 'none' }}>
                {id && <CompanyInfo detail={flagsList} />}
            </div>
            {
                typeFilter == 2 || typeFilter == 1 ? <FlagsTable id={id} handleClick={handleClick} array={flagsList?.problem || []} title='Problem' primeryColr={"#FFEEEE"} seconderyColr={"#EA3815"} searchItem={debouncedSearchValue} /> : ""
            }

            {
                typeFilter == 3 || typeFilter == 1 ? <FlagsTable id={id} handleClick={handleClick} array={flagsList?.warning || []} title='Warning' primeryColr={"#FFF0E0"} seconderyColr={"#FFA875"} searchItem={debouncedSearchValue} /> : ""

            }
            {
                typeFilter == 4 || typeFilter == 1 ? <FlagsTable id={id} handleClick={handleClick} array={flagsList?.good || []} title='Good Standing' primeryColr={"#C2FFEC"} seconderyColr={"#66E6B3"} searchItem={debouncedSearchValue} /> : ""

            }
            {
                typeFilter == 5 || typeFilter == 1 ? <FlagsTable id={id} handleClick={handleClick} array={flagsList?.notSendNumbers || []} title='No Message Sent' primeryColr={"#c2eeff"} seconderyColr={"#66cfe6"} searchItem={debouncedSearchValue} /> : ""

            }
            <CompanyPopup setNoMessageSent={setNoMessageSent} noMessageSent={noMessageSent} companyName={companyName} refreshDetails={refreshDetails} open={openPopup} setOpen={setOpenPopup} selectedNumber={selectedNumber} popupData={popupData} tenantId={tenantId} />
        </div>
    )
}

export default FlagsData
