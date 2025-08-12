import { useState, useEffect, useRef } from "react";
import { BsDash } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { isEmpty } from "lodash-es";

import { GetAllUser, GetAllUserWithAdmin } from "@/store/actions";

import { UsersButtonDropdownStyled, MyLightTooltip } from "../styles";

const UsersFilter = ({ selectUser, isOpen, toggleDropdown }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { usersWithAdmin: users } = useSelector((state) => state.authReducer);
  useEffect(() => {
    // dispatch(GetAllUserWithAdmin());
    // dispatch(GetAllUser());
  }, []);

  useEffect(() => {
    setFilteredData(
      users?.filter((user) =>
        (user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`)
          ?.toLowerCase()
          ?.includes(searchText?.toLowerCase())
      )
    );
  }, [searchText, users]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const toggleDropdownInside = (event) => {
    // setIsOpen(!isOpen);
    toggleDropdown();
    event.stopPropagation();
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // setIsOpen(false);
      toggleDropdown();
    }
  };

  const getUserName = (user) => {
    return user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
  };

  const selectUserClicked = (e, user) => {
    e.stopPropagation();
    setSelectedUser(user);
    selectUser(user);
    toggleDropdown();
  };

  return (
    <MyLightTooltip
      placement="bottom"
      open={isOpen}
      title={
        <UsersButtonDropdownStyled ref={dropdownRef}>
          <div className="top">
            <input
              type="text"
              placeholder="Search User"
              value={searchText}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="bottom">
            {filteredData.length > 0 &&
              filteredData.map((user, i) => (
                <button
                  key={i}
                  className={classNames({
                    selected: user._id === selectedUser?._id,
                  })}
                  onClick={(e) => selectUserClicked(e, user)}
                >
                  <span className="text">{getUserName(user)}</span>
                  <span
                    className="dash"
                    onClick={(e) => selectUserClicked(e, null)}
                  >
                    <BsDash />
                  </span>
                </button>
              ))}
          </div>
        </UsersButtonDropdownStyled>
      }
    >
      <div
        className={classNames({
          selected: !isEmpty(selectedUser),
        })}
        onClick={toggleDropdownInside}
      >
        <span className="text">
          {selectedUser ? getUserName(selectedUser) : "Users"}
        </span>
        <span className="icon">
          <FaChevronDown />
        </span>
      </div>
    </MyLightTooltip>
  );
};

export default UsersFilter;
