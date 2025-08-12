import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionEditStyled } from "./styles";
import Components from "@/components";
import { useEffect, useLayoutEffect, useState } from "react";
import { MyCheckbox } from "@/components/common";
import { useFormik } from "formik";
import { permisionSchema } from "@/schema";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSinglePermission,
  UpdateSinglePermission,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { useGlobalContext } from "@/hooks";

const PermissionEdit = () => {
  const [isCorePermission, setIsCorePermission] = useState([]);
  const { setIsLoaderShowing } = useGlobalContext();
  const navigate = useNavigate();
  const { permissionId } = useParams();

  const {
    message,
    singlePermission,
    errors: error,
    loading,
  } = useSelector((state) => state.permissionReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      permissionName: singlePermission?.name && singlePermission.name,
    },
    enableReinitialize: true,
    validationSchema: permisionSchema,
    onSubmit: (value) => {
      let { permissionName } = value;
      let finalResult = { name: permissionName };
      dispatch(UpdateSinglePermission(finalResult, permissionId));
    },
  });

  useEffect(() => {
    if (!permissionId) {
      navigate(-1);
    }
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate(-1), 3000);
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(GetSinglePermission(permissionId));
  }, [dispatch, permissionId]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  return (
    <PermissionEditStyled>
      <div className="top">
        <div className="left">
          <h1>Edit Permission</h1>
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
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={!formik.isValid || !formik.dirty}
            text={loading ? "Please wait..." : "Update"}
            icon={<FaSave />}
          />
        </div>
      </form>
    </PermissionEditStyled>
  );
};

export default PermissionEdit;
