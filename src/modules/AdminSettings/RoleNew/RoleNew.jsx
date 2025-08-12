import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RoleNewStyled } from "./styles";
import Components from "@/components";
import { useFormik } from "formik";
import { roleSchema } from "@/schema";
import { useState, useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPermission,
  CreateRole,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { useGlobalContext } from "@/hooks";

const RoleNew = () => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { setIsLoaderShowing } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    permissions,
    errors: error,
    loading2,
  } = useSelector((state) => state.permissionReducer);

  const { message, errors, loading } = useSelector(
    (state) => state.roleReducer
  );

  const formik = useFormik({
    initialValues: { roleName: "" },
    validationSchema: roleSchema,
    onSubmit: (value) => {
      const { roleName } = value;
      let permissions = [];
      if (selectedPermissions.length > 0) {
        selectedPermissions.forEach((item) => {
          permissions.push(item.name);
        });
      }
      let finalResult = { name: roleName, permissions };
      dispatch(CreateRole(finalResult));
    },
  });

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setSelectedPermissions([]);
      formik.resetForm();
      setTimeout(() => navigate("/admin-settings/role-list"), 3000);
    }
  }, [error, errors, message]);

  useEffect(() => {
    dispatch(GetAllPermission());
  }, []);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading || loading2);
  }, [loading, setIsLoaderShowing, loading2]);

  return (
    <RoleNewStyled>
      <div className="top">
        <div className="left">
          <h1>Create New Role</h1>
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
              Role Name <span>*</span>
            </h6>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Role Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roleName}
              name="roleName"
            />
            {formik.touched.roleName && formik.errors.roleName && (
              <p>{formik.errors.roleName}</p>
            )}
          </div>
        </label>
        <label className="permissions">
          <div className="top">
            <h6 className="text">Role Permissions</h6>
          </div>
          <div className="bottom">
            {permissions.length > 0 &&
              permissions.map((val, i) => (
                <div className="item" key={i}>
                  <span className="text">{val.name}</span>
                  <Components.Common.MySwitch
                    isChecked={selectedPermissions.find((v) => v === val)}
                    onClick={() =>
                      setSelectedPermissions((p) =>
                        p.find((v) => v === val)
                          ? p.filter((v) => v !== val)
                          : [...p, val]
                      )
                    }
                    title="Select"
                  />
                </div>
              ))}
          </div>
        </label>

        <div className="group">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setSelectedPermissions([]);
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
    </RoleNewStyled>
  );
};

export default RoleNew;
