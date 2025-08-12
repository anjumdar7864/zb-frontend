import React, { useEffect, useState } from 'react'
import styles from './Flags.module.css'
import Select from "react-select";
import { FiSearch } from 'react-icons/fi';
import FlagsData from './FlagsData';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import { commonAPICall } from '@/services/api/common';
import { logOut } from '@/store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const tableType = [
  { id: 1, name: 'Deliverability Status' },
  { id: 2, name: 'Problem' },
  { id: 3, name: 'Warning' },
  { id: 4, name: 'Good Standing' },
  { id: 5, name: 'No Message Sent' },

];
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#5BF1B2' : '#D3D7DD', // Change border color
    boxShadow: 'none',
    borderRadius: '8px', // Change border radius
    height: "40px",
    '&:hover': {
      borderColor: '#5BF1B2', // Hover border color
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 8,
  }),
  indicatorSeparator: () => ({
    display: 'none', // Remove the indicator separator line
  }),
  menu: (provided) => ({
    ...provided,
    // Dropdown list background color
    zIndex: 1000, // Set z-index for menu
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 1000, // Set z-index for menu portal to ensure it’s on top
  }),
};
const Flags = () => {
  const [id, setId] = useState("")
  const [flagsList, setFlagsList] = useState([])
  const [companyFilter, setCompanyFilter] = useState([])
  const [companyId, setCompanyId] = useState('')
  const [companyIdName, setCompanyIdName] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [typeFilter, setTypeFilter] = useState(1)
  const [typeFilterName, setTypeFilterName] = useState()
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e, i) => {

    setId(e.id)

  }

  const fetchData = async (compId, debouncedSearchValue) => {



    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_FLAGS_LIST}${compId ? `?tenantId=${compId}` : ""}`
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());
        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }

      setFlagsList(data)


    } catch (error) {
      console.log(error);
    }


  }


  const fetchCompanyData = async () => {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_COMPANIES}?mode=flag`
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }


      setCompanyFilter(data?.results)

    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    fetchData()
    fetchCompanyData()
  }, [])

  const fetchFunc = () => {
    fetchData()
    fetchCompanyData()
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // Debounce delay of 500ms

    // Cleanup the timeout if searchValue changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <div className={styles.title}>Flags</div> */}
                <div
                        //  className={styles.InboxStyledTop}
                        className='pageHeaderLayout'
                    >
                        <div className={styles.InboxStyledTopLeft}>
                            <h1
                                //  className={styles.InboxStyledTopLeftH1}
                                className='body1SemiBold textPrimeryColor'
                            >Flags</h1>
                        </div>
        
                   
                    </div>
        <div className={styles.filter_container}>
          <div className={styles.filter_left} >
            <div className={styles.select_container}>
              <form onSubmit={(e) => {
                e.preventDefault(); // ✅ Prevent page refresh
              }} autoComplete="off">
                <Select
                  value={companyIdName && companyIdName}
                  onChange={(e) => {
                    setCompanyId(e.value)
                    setCompanyIdName(e)
                    fetchData(e.value)
                  }
                  }
                  styles={customStyles}
                  options={[
                    // { value: "", label: "Reset" }, 
                    ...companyFilter.map((option) => ({
                      value: option._id,
                      label: option.companyName,
                    })),
                  ]}
                  isSearchable
                  placeholder="Company Name"

                />
              </form>

            </div>
            <div className={styles.select_container}>
              <form onSubmit={(e) => {
                e.preventDefault(); // ✅ Prevent page refresh
              }} autoComplete="off">
                <Select
                  value={typeFilterName && typeFilterName}
                  onChange={(e) => {
                    setTypeFilter(e.value)
                    setTypeFilterName(e)
                    console.log("typeFilterName", e);


                  }}
                  styles={customStyles}
                  options={tableType.map((option) => ({
                    value: option.id,
                    label: option.name,
                  }))}
                  isSearchable
                  placeholder="Deliverability Status"

                />
              </form>

            </div>
            <div onClick={() => {
              setTypeFilter(1)
           
              setTypeFilterName({ value: 1, label: 'Deliverability Status' })
              setCompanyId("")
              setCompanyIdName({ value: "", label: "Company Name" })
              fetchData("")
              setSearchValue("")
            }} className='body4Regular textSecondaryColor' style={{ height: "40px", display: "flex", alignItems: "center", cursor: "pointer", justifyContent: "center", borderRadius: "8px", backgroundColor: "white", border: "solid 1px #D3D7DD", color: "#777777", width: "100px" }}>Reset</div>
          </div>
          <div className={styles.filter_right}>
            <div className={styles.searchContainer}>
              <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
              <form onSubmit={(e) => {
                e.preventDefault(); // ✅ Prevent page refresh
              }} autoComplete="off">
           
                <input
                  autoComplete="off"
                  className={styles.SearchInput}
                  value={searchValue}
                  onChange={(e) => {
                    let inputValue = e.target.value;

                    // Remove leading '1' if present
                    if (inputValue.charAt(0) === '1') {
                      inputValue = inputValue.slice(1);
                    }

                    // Remove all non-alphanumeric characters and spaces
                    inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

                    setSearchValue(inputValue);
                  }}
                  type="text"
                  placeholder="Search..."
                />
              </form>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.bottom}>
        <FlagsData typeFilter={typeFilter} fetchFunc={fetchFunc} handleClick={handleClick} flagsList={flagsList} id={companyId} debouncedSearchValue={debouncedSearchValue} />
      </div>
    </div>
  )
}

export default Flags
