import { FaArrowLeft, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { UsersListStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import { useGlobalContext } from "@/hooks";
import { remToPixels } from "@/utils";
import Components from "@/components";
import { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPermission,
  DeletePermission,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    message,
    permissions,
    errors: error,
    loading,
  } = useSelector((state) => state.permissionReducer);
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("permissions is", permissions);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(GetAllPermission());
  }, []);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);
  useEffect(() => {
    setFilteredData(
      permissions?.filter((role) =>
        role?.name?.toLowerCase()?.startsWith(searchText?.toLowerCase())
      )
    );
  }, [searchText, permissions]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (!search) return;
    setSearchText(search);
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const timeZoneOffset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - timeZoneOffset * 60000);
    const formattedDate = `${
      localDate.getMonth() + 1
    }/${localDate.getDate()}/${localDate
      .getFullYear()
      .toString()
      .slice(-2)}, ${formatAMPM(localDate)}`;
    return formattedDate;
  };

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours || 12; // Convert 0 to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <UsersListStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <div className="top">
        <div className="left">
          <h1>Permissions List</h1>
        </div>
        <div className="right">
          <div className="top">
            <button onClick={() => navigate(-1)}>
              <span className="icon">
                <FaArrowLeft />
              </span>
              <span className="text">Back</span>
            </button>
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              name="search"
              onChange={(e) => (e.target.value === "" ? setSearchText("") : "")}
            />
            <button>
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div className="bottom">
        <div className="table">
          <div className="row">
            <h6 className="col">Name</h6>
            <h6 className="col">Assigned To</h6>
            <h6 className="col">Created Date</h6>
            {/* <h6 className="col" style={{ display: "none" }}>
              Actions
            </h6> */}
          </div>
          {filteredData.length === 0 && (
            <div className="row body">
              <p className="error">No Record Found!</p>
            </div>
          )}
          {filteredData.length > 0 &&
            filteredData.map((data, i) => (
              <div className="row body" key={i}>
                <div className="col data">
                  <p>{data?.name && data.name}</p>
                </div>
                <div className="col assign">
                  {data?.assignedTo?.map((val, i) => (
                    <span key={i}>{val}</span>
                  ))}
                </div>
                <div className="col data">
                  <p>{data?.createdAt && formatDate(data.createdAt)}</p>
                </div>
                {/* <div className="col actions" style={{ display: "none" }}>
                  <LightTooltip arrow placement="top" title="Edit">
                    <button
                      className="icon"
                      onClick={() =>
                        navigate(`/admin-settings/permission-edit/${data?._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                  </LightTooltip>
                  <LightTooltip arrow placement="top" title="Delete">
                    <button
                      className="icon"
                      onClick={() => setSelectedDeleteId(data?._id)}
                    >
                      <FaTrash />
                    </button>
                  </LightTooltip>
                </div> */}
              </div>
            ))}
        </div>
      </div>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() =>
          setSelectedDeleteId((p) => {
            dispatch(DeletePermission(p));
            return "";
          })
        }
        open={Boolean(selectedDeleteId)}
        deleteItemName="Permission"
      />
    </UsersListStyled>
  );
};

export default UsersList;
