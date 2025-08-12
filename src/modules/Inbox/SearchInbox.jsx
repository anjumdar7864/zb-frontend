import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { getAllInboxMessages, getAllInboxMessagesFilters } from "@/store/actions";
import { IoSearch } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

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
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch(
        getAllInboxMessagesFilters({ limit: 10, page: currentPage,  ...filters })
      );
    }
  };
  return (
    <form className="right" onSubmit={handleSubmit}>
       <button style={{width:"50px"}}>
       <LuSearch />
      </button>
      <input
        type="text"
        placeholder="Search for a user"
        name="search"
        value={searchText}
        onChange={(e) => handleChange(e)}
        style={{flex:1 , borderRadius:0 , }}
      />
     
    </form>
  );
};

export default SearchInbox;
