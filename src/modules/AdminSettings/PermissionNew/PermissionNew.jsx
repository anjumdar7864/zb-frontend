import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PermissionNewStyled } from "./styles";
import Components from "@/components";
import { useLayoutEffect, useState } from "react";
import { MyCheckbox } from "@/components/common";
import { permisionSchema } from "@/schema";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePermission,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { useGlobalContext } from "@/hooks";

const PermissionNew = () => {
  const [isCorePermission, setIsCorePermission] = useState([]);
  const { setIsLoaderShowing } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.permissionReducer);
  const formik = useFormik({
    initialValues: { permissionName: "" },
    validationSchema: permisionSchema,
    onSubmit: (value) => {
      let { permissionName } = value;
      let finalResult = { name: permissionName };
      dispatch(CreatePermission(finalResult));
    },
  });

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      formik.resetForm();
      setTimeout(() => navigate("/admin-settings/permission-list"), 3000);
    }
  }, [error, message]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  return (
    <PermissionNewStyled>
      <div className="top">
        <div className="left">
          <h1>Create New Permissions</h1>
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
        </div>
      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <label className="input">
          <div className="top">
            <h6 className="text">
              Permission Name <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Permission Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.permissionName}
              name="permissionName"
            />
            {formik.touched.permissionName && formik.errors.permissionName && (
              <p className="error">{formik.errors.permissionName}</p>
            )}
            <MyCheckbox
              title="Set as a core permission"
              isChecked={isCorePermission}
              onClick={() => setIsCorePermission((p) => !p)}
            />
            <p className="info">
              Permission set as a <span>Core Permission</span> will be locked
              and <span>not editable</span> in future
            </p>
          </div>
        </label>

        <div className="group">
          <button type="button" onClick={() => formik.resetForm()}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={!formik.isValid || !formik.dirty}
            text={loading ? "Please wait..." : "Create"}
            icon={<FaSave />}
          />
        </div>
      </form>
    </PermissionNewStyled>
  );
};

export default PermissionNew;
