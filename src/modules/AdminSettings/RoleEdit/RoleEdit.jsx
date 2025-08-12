import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { RoleEditStyled } from "./styles";
import Components from "@/components";
import { useEffect, useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import { roleSchema } from "@/schema";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPermission,
  GetSingleRole,
  UpdateSingleRole,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { arraysHaveSameElements } from "@/utils";
import { useGlobalContext } from "@/hooks";

const RoleEdit = () => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { setIsLoaderShowing } = useGlobalContext();
  const navigate = useNavigate();
  const { roleId } = useParams();
  const {
    message,
    singleRole,
    errors: error,
    loading,
  } = useSelector((state) => state.roleReducer);

  const {
    permissions,
    errors: error2,
    loading: loading2,
    message: message2,
  } = useSelector((state) => state.permissionReducer);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      roleName: singleRole?.name && singleRole.name,
    },
    enableReinitialize: true,
    validationSchema: roleSchema,
    onSubmit: (value, { resetForm }) => {
      dispatch(
        UpdateSingleRole(
          {
            permissions: selectedPermissions,
            name: value?.roleName,
          },
          roleId
        )
      );
      resetForm();
    },
  });

  useEffect(() => {
    if (!singleRole?.permissions) return;
    setSelectedPermissions(singleRole?.permissions);
  }, [singleRole]);

  useEffect(() => {
    if (!roleId) {
      navigate(-1);
    }
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (error2.length > 0) {
      toast.error(error2);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate(-1), 3000);
    }
    if (message2 !== "") {
      toast.success(message2);
      dispatch(clearMessages());
      setTimeout(() => navigate(-1), 3000);
    }
  }, [dispatch, error, error2, message, message2, navigate, roleId]);

  useLayoutEffect(() => {
    dispatch(GetSingleRole(roleId));
    dispatch(GetAllPermission());
  }, [dispatch, roleId]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading || loading2);
  }, [loading, setIsLoaderShowing, loading2]);

  return (
    <RoleEditStyled>
      <div className="top">
        <div className="left">
          <h1>Edit Role</h1>
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
            {permissions.map((permission, i) => (
              <div className="item" key={i}>
                <span className="text">{permission?.name}</span>
                <Components.Common.MySwitch
                  isChecked={selectedPermissions.find(
                    (v) => v === permission?.name
                  )}
                  onClick={() =>
                    setSelectedPermissions((p) =>
                      p.find((v) => v === permission?.name)
                        ? p.filter((v) => v !== permission?.name)
                        : [...p, permission?.name]
                    )
                  }
                  title="Select"
                />
              </div>
            ))}
          </div>
        </label>

        <div className="group">
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            text={loading || loading2 ? "Loading..." : "Update"}
            icon={<FaSave />}
            disabled={
              !formik.isValid ||
              (!formik.dirty &&
                arraysHaveSameElements(
                  singleRole?.permissions ?? [],
                  selectedPermissions ?? []
                )) ||
              loading ||
              loading2
            }
          />
        </div>
      </form>
    </RoleEditStyled>
  );
};

export default RoleEdit;
