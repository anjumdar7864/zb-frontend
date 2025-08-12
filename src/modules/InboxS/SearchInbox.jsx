import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { getAllInboxMessages, getAllInboxMessagesFilters } from "@/store/actions";
import { IoSearch } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import styles from "./Inbox.module.css";
const SearchInbox = ({filters , searchText , setSearchText , setCurrentPage , currentPage }) => {
  // const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    setCurrentPage(1)
    e.preventDefault();
    // dispatch(getAllInboxMessages({ limit: 25, page: 1, userName: searchText }));
    if(searchText != ""){
      dispatch(getAllInboxMessagesFilters({ limit: 100, page: 1, userName: searchText }));

    }
    
  };

  // useEffect(() => {
  //   const getData = setTimeout(() => {
  //     if (searchText == "") {
  //       dispatch(
  //         getAllInboxMessages({ limit: 25, page: 1, userName: searchText })
  //       );
  //     }
  //   }, 500);
  //   return () => clearTimeout(getData);
  // }, [searchText]);

  const handleChange = (e) => {
    console.log("find changing" , e.target.value);
    
    setSearchText(e.target.value);
    if (e.target.value === "") {
      console.log("find changing ====== " , e.target.value);
      dispatch(
        getAllInboxMessagesFilters({ limit: 25, page: currentPage,  ...filters })
      );
    }
  };
  return (
    <form 
    className={`${styles.InboxStyledTopRight} boxHeight`}
        onSubmit={handleSubmit}>
       <button style={{width:"50px"}}>
       <LuSearch  style={{width:"18px", height:"18px"}}/>
      </button>
      <input
      className={styles.InboxStyledTopRightInput}
        type="text"
        placeholder="Search for a user"
        name="search"
        value={searchText}
        onChange={(e) => handleChange(e)}
        style={{flex:1 , borderRadius:8 , }}
      />
     
    </form>
  );
};

export default SearchInbox;
