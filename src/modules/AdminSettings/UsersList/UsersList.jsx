import {
  FaArrowLeft,
  FaEdit,
  FaTimes,
  FaSearch,
  FaTrash,
  FaUser,
  FaSave,
} from "react-icons/fa";
import {
  TransferModelStyle,
  UsersListStyled,
  PasswordModelStyle,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import Assets from "@/assets";
import { useGlobalContext } from "@/hooks";
import { remToPixels } from "@/utils";
import Components from "@/components";
import { useState, useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { TbArrowsTransferUp } from "react-icons/tb";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  GetAllUser,
  DeleteUser,
  LoginAsUser,
  clearErrors,
  clearMessages,
  VerifyPassword,
} from "./../../../store/actions";

const UsersList = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isPasswordModel, setIsPasswordModel] = useState(false);
  const [leadTransferData, setLeadTransferData] = useState(false);

  const navigate = useNavigate();
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const dispatch = useDispatch();
  const {
    message,
    users,
    errors: error,
    loading,
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
      setIsPasswordModel(false);
      setLeadTransferData("");
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setIsPasswordModel(false);
      setLeadTransferData("");
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(GetAllUser());
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

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (!search) return;
    setSearchText(search);
  };

  const loginAsUser = (user) => {
    const { email } = user;
    dispatch(
      LoginAsUser(email, () => {
        navigate("/redirect?redirect=/dashboard");
        window.location.reload();
      })
    );
  };

  return (
    <>
      <Components.Common.ModalTop open={isModelOpen} onClose={() => {}}>
        <TransferModel
          onClose={() => setIsModelOpen(false)}
          selectedUserId={selectedUserId}
          onSave={() => setIsPasswordModel(!isPasswordModel)}
          setIsPasswordModel={setIsPasswordModel}
          setLeadTransferData={setLeadTransferData}
          setIsModelOpen={setIsModelOpen}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop open={isPasswordModel} onClose={() => {}}>
        <PasswordModel
          onClose={() => setIsPasswordModel(false)}
          setLeadTransferData={setLeadTransferData}
          leadTransferData={leadTransferData}
        />
      </Components.Common.ModalTop>

      <UsersListStyled
        tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
      >
        <div className="top">
          <div className="left">
            <h1>Users List</h1>
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
                onChange={(e) =>
                  e.target.value === "" ? setSearchText("") : ""
                }
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
              <h6 className="col">User</h6>
              <h6 className="col">Role</h6>
              <h6 className="col">Joined Date</h6>
              <h6 className="col">Actions</h6>
            </div>
            {filteredData.length === 0 && (
              <div className="row body">
                <p className="error">No Record Found!</p>
              </div>
            )}
            {filteredData.length > 0 &&
              filteredData.map((data, i) => (
                <div className="row body" key={i}>
                  <div className="col user">
                    <div className="left">
                      <img
                        src={data?.avatar ?? Assets.Images.Avatar}
                        alt="AVATAR"
                      />
                    </div>
                    <div className="right">
                      <p>
                        {data?.fullName ??
                          `${data?.firstName ?? ""} ${data?.lastName ?? ""}`}
                      </p>
                      <span>{data?.email && data.email}</span>
                    </div>
                  </div>
                  <div className="col data">
                    <p>{data?.role?.name && data.role.name}</p>
                  </div>
                  <div className="col data">
                    <p>{data?.createdAt && formatDate(data.createdAt)}</p>
                  </div>
                  <div className="col actions">
                    <LightTooltip
                      arrow
                      placement="top"
                      title="Login as this user"
                    >
                      <button
                        className="icon"
                        onClick={() => loginAsUser(data)}
                      >
                        <FaUser />
                      </button>
                    </LightTooltip>
                    <LightTooltip arrow placement="top" title="Edit">
                      <button
                        className="icon"
                        onClick={() =>
                          navigate(`/admin-settings/user-edit/${data?._id}`)
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
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Components.Common.DeleteModal
          onClose={() => setSelectedDeleteId("")}
          onOkay={() => {
            setIsModelOpen(!isModelOpen);
            setSelectedUserId(selectedDeleteId);
            setSelectedDeleteId("");
          }}
          open={Boolean(selectedDeleteId)}
          deleteItemName="User"
          deleteItemText={
            "Before Deletion you have to transfer to another user. "
          }
        />
      </UsersListStyled>
    </>
  );
};

export default UsersList;

const TransferModel = ({
  onClose,
  selectedUserId,
  onSave,
  setIsPasswordModel,
  setLeadTransferData,
  setIsModelOpen,
}) => {
  const { users } = useSelector((state) => state.authReducer);
  const [idOfSelectedDropDown, setIdOfSelectedDropDown] = useState("");
  const [permission, setPermission] = useState("user");
  let userWithoutSelectedId = users.filter(
    (item) => item._id !== selectedUserId
  );

  const formik = useFormik({
    initialValues: {
      userId: idOfSelectedDropDown,
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      let oldUserId = selectedUserId;
      let newUserId = values?.userId?.value;
      let finalResult = { oldUserId, newUserId, permission };
      setLeadTransferData(finalResult);
      setIsPasswordModel(true);
      setIsModelOpen(false);
      actions.resetForm();
      setIdOfSelectedDropDown("");
      setPermission("");
    },
  });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const userType =
      localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";
    if (userType === "admin" && userWithoutSelectedId.length <= 0) {
      setIdOfSelectedDropDown({ value: user?._id });
      setPermission("admin");
    }
  }, []);

  return (
    <TransferModelStyle>
      <div className="top">
        <h2>Transfer Lead</h2>
        <button
          type="button"
          onClick={(e) => {
            onClose(e);
            formik.resetForm();
            setIdOfSelectedDropDown("");
            setLeadTransferData("");
          }}
        >
          <FaTimes />
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {userWithoutSelectedId?.length > 0 ? (
          <label>
            <span className="text">Select User</span>
            <Select
              value={idOfSelectedDropDown}
              onChange={(e) => {
                setIdOfSelectedDropDown(e);
              }}
              options={userWithoutSelectedId.map((option) => ({
                value: option._id,
                label: option.firstName + " " + option.lastName,
              }))}
              isSearchable
              placeholder="Search..."
            />
          </label>
        ) : (
          <p style={{ color: "red" }}>
            You don't have any user if u wish to transfer it will transfer to
            your's account
          </p>
        )}

        <div className="bottom">
          <button
            type="button"
            onClick={(e) => {
              onClose(e);
              formik.resetForm();
              setIdOfSelectedDropDown("");
              setLeadTransferData("");
            }}
          >
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            text="Save"
            icon={<FaSave />}
            type="submit"
            disabled={!idOfSelectedDropDown}
          />
        </div>
      </form>
    </TransferModelStyle>
  );
};

const PasswordModel = ({ onClose, setLeadTransferData, leadTransferData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      let finalResult = { email: user?.email, password: values.password };
      dispatch(VerifyPassword(finalResult, leadTransferData));
      actions.resetForm();
      setLeadTransferData("");
    },
  });
  return (
    <PasswordModelStyle>
      <header>
        <h2>Verify password</h2>
        <button
          type="button"
          onClick={(e) => {
            onClose(e);
            setLeadTransferData("");
          }}
        >
          <FaTimes />
        </button>
      </header>

      <section>
        <form onSubmit={formik.handleSubmit}>
          <blockquote>
            <label>Type password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </blockquote>
          <div>
            <button
              type="button"
              onClick={(e) => {
                onClose(e);
                formik.resetForm();
                setLeadTransferData("");
              }}
            >
              Cancel
            </button>
            <Components.Common.ButtonRightIcon
              disabled={!formik.isValid || !formik.dirty}
              text={loading ? "Please wait..." : "Save"}
              icon={<FaSave />}
              type="submit"
            />
          </div>
        </form>
      </section>
    </PasswordModelStyle>
  );
};
