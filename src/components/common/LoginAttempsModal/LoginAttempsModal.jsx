
import { ChangePassword , getLoginHistory } from "@/store/actions";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordModalStyled, LoginAttempsModalItemStyled, LoginAttempsModalStyled } from "../Header/styles";
import { useEffect, useState , useLayoutEffect } from "react";
import Components from "@/components";
import { passwordChangeSchema, profileUpdateSchema } from "@/schema";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Assets from "@/assets";
import { CircularProgress } from "@mui/material";
import { formatDateToRelative } from "@/utils";



const LoginAttempsModalItem = ({ record }) => {
  return (
    <LoginAttempsModalItemStyled>
      <div className="left">
        <img src={Assets.Images.Avatar} alt="AVATAR" />
      </div>
      <div className="right">
        <div className="item">
          <h6>IP address</h6>
          <p>{record?.ip ?? "IP Not Found"}</p>
        </div>
        <div className="item">
          <h6>Browser</h6>
          <p>{record?.browser ?? "No Agent Found"}</p>
        </div>
        <div className="item">
          <h6>Time</h6>
          <p>{formatDateToRelative(record?.createdAt ?? Date.now())}</p>
        </div>
      </div>
    </LoginAttempsModalItemStyled>
  );
};

const LoginAttempsModal = ({ onClose }) => {
    const { loginHistory, loading } = useSelector((s) => s.authReducer);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
      dispatch(getLoginHistory());
    }, [dispatch]);
  
    return (
      <LoginAttempsModalStyled>
        <div className="top">
          <h2>Login attempts</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        {loading ? (
          <div className="bottom loading">
            <div>
              <CircularProgress />
            </div>
            <div>LOADING...</div>
          </div>
        ) : (
          <div className="bottom data">
            {loginHistory?.results?.length === 0 && <p>No Record Found</p>}
            {loginHistory?.results?.map((record, i) => (
              <LoginAttempsModalItem key={i} record={record} />
            ))}
          </div>
        )}
      </LoginAttempsModalStyled>
    );
  };

  export default LoginAttempsModal


