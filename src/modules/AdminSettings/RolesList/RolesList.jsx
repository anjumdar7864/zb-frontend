import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { RolesListStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllRole,
  DeleteRole,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import Components from "@/components";
import { useGlobalContext } from "@/hooks";

const RolesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const { setIsLoaderShowing } = useGlobalContext();
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {
    message,
    roles,
    errors: error,
    loading,
  } = useSelector((state) => state.roleReducer);

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
    dispatch(GetAllRole());
  }, [dispatch]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);
  useEffect(() => {
    setFilteredData(
      roles?.filter((role) =>
        role?.name?.toLowerCase()?.startsWith(searchText?.toLowerCase())
      )
    );
  }, [searchText, roles]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (!search) return;
    setSearchText(search);
  };
  return (
    <RolesListStyled>
      <div className="top">
        <div className="left">
          <h1>All Roles List</h1>
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
        {filteredData.length === 0 && <p className="error">No Record Found</p>}
        {filteredData.length > 0 &&
          filteredData.map((data, i) => (
            <div key={i} className="item">
              <div className="top">
                <h2>{data?.name && data.name}</h2>
              </div>
              <div className="bottom">
                {/* <div className="top">
                  <h6>Total users with this role: 30</h6>
                </div> */}
                {/* <div className="bottom"> */}
                <div className="top">
                  {data?.permissions?.map((val, j) => (
                    <p key={j}>
                      <span className="icon"></span>
                      <span className="text">{val}</span>
                    </p>
                  ))}
                </div>
                <div className="bottom">
                  <button onClick={() => setSelectedDeleteId(data?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin-settings/role-edit/${data?._id}`)
                    }
                  >
                    Edit
                  </button>
                </div>
                {/* </div>   */}
              </div>
            </div>
          ))}
      </div>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() =>
          setSelectedDeleteId((p) => {
            dispatch(DeleteRole(p));
            return "";
          })
        }
        open={Boolean(selectedDeleteId)}
        deleteItemName="Role"
      />
    </RolesListStyled>
  );
};

export default RolesList;
