import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import RolesAndPermissionsModalTable from "./RolesAndPermissionsModalTable";
import styled from "@emotion/styled";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetAllPermission, logOut } from "@/store/actions";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";

import Components from "@/components";
import { CircularLoader } from "@/components/common";
import toast from "react-hot-toast";
const Checkbox = styled.input`
  //   margin-right: 8px;
  //   // width: 20px; /* Set width */
  //   // height: 20px; /* Set height */
  //   // border: 2px solid #D3D7DD; /* Default border color */
  //   // appearance: none; /* Remove default checkbox styling */
  //   // cursor: pointer;
  //   // border-radius: 6px ;
  //   // &:checked {
  //   //   background-color: #C2FFEC; /* Background color when checked */
  //   //   border-color: #00BD82; /* Border color when checked */
  //   // }

  //   // &:checked::before {
  //   //   content: '\\2713';
  //   //   display: flex;
  //   //   justify-content: center;
  //   //   align-items: center;
  //   //   color: #00BD82; /* Checkmark color */
  //   // }

  //   // &:hover {
  //   //   border-color: #888; /* Border color on hover */
  //   // }

  //
`;
const PermissionsArea = styled.div`
  flex: 1;
  height:100% ; 
  padding: 16px;
  overflow: auto;
  border-radius: 10px;
  // max-height: 50vh;

  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00bd82;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #00bd82;
  }
`;
const PermissionsAreaContainer = styled.div`

flex-grow:1 ;
 overflow:auto 

  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00bd82;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #00bd82;
  }
`;
const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 23px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark {
    background-color: #c2ffec;
    border: solid 2px #00bd82;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
`;
const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  // background-color: #eee;
  border-radius: 5px;
  border: solid 2px #d3d7dd;

  .container input:checked ~ .checkmark {
    border: solid 2px #00bd82;
  }
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
    width: 7px; /* Adjust width */
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    border-color: #00bd82;
  }
`;
const SubItems = styled.div`
  // margin-left: 24px;
  margin-left: 34px;
  display: flex;
  flex-direction: column;
  // gap: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const FolderContainer = styled.div`
  display: flex;
  align-items: center;
  // font-size: 1.5rem;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  color: #012635;
  gap: 8px;
  cursor: pointer;
  padding: 8px 0px;
  padding-bottom: 17px;
`;
const initialValues = {
  name: '',
  permissions: [],
  color: '#FF5D3E',
  id: ""
}
const RolesAndPermissionsModal = ({ onClose, selectedRecord }) => {
  console.log("check data..." , selectedRecord );
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPermission());
  }, []);
  useEffect(() => {
    if (selectedRecord && Object.keys(selectedRecord).length) {
      const { name, color, permissions, _id } = selectedRecord;
      setState({
        ...state,
        name,
        permissions,
        color , 
        id: _id
      });
      setIsEdit(true)
    }
  }, [JSON.stringify(selectedRecord)])
  const { permissions } = useSelector((state) => state.permissionReducer);
  const [state, setState] = useState({ ...initialValues });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const filteredPermissions = permissions;
  const colorOptions = [
    { value: "#FF5D3E", label: "Red" },
    { value: "#6955DA", label: "purpel" },
    { value: "#3086EE", label: "Blue" },
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    console.log("checking issue" , value);
    
    setState({
      ...state,
      color: value
    })
    setIsOpen(false);
  };
  const changeHandler = (e) => {
    const { name, value } = e?.target || {};
    setState({
      ...state,
      [name]: value
    })
  }
  const handleCheck = (name, isChecked, children) => {
    let updatedPermissions;

    if (isChecked) {
      updatedPermissions = [...state?.permissions, name];
      if (children.length > 0) {
        updatedPermissions = [
          ...new Set([
            ...updatedPermissions,
            ...children.map((child) => child.name),
          ]),
        ];
      }
    } else {
      updatedPermissions = state?.permissions?.filter((perm) => perm !== name);
      if (children.length > 0) {
        updatedPermissions = updatedPermissions.filter(
          (perm) => !children.map((child) => child.name).includes(perm)
        );
      }
    }

    setState({
      ...state,
      permissions: updatedPermissions
    });
  };
  const saveHandler = async () => {
    const { name, color, permissions, id } = state;
    if(permissions.length == 0){
      toast.error("Select atleast one permission");
    }
    if(!name){
      toast.error("Enter role name");
    }
    if (name && permissions?.length) {
      try {
        setLoader(true);
        let payload = { name, permissions , color };
        const Method = isEdit ? REQUEST_TYPES.PATCH : REQUEST_TYPES.POST;
        let Url = `${ENDPOINTS.GET_TENANt_ROLES}`;
        Url = isEdit ? `${Url}/${id}` : Url;
        payload = isEdit ? { ...payload } : { color, ...payload };
        const { data, isError, message , sessionExpired } = await commonAPICall(
          Method,
          Url,
          payload
        );
        setLoader(false);
        toast.success("Successfully updated!");
        if(sessionExpired){
   

        
          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          return toast.error(message);
        }
        setState({ ...initialValues });
        setTimeout(() => {
          setIsEdit(false);
          onClose();
        }, 500)
      } catch (error) {

        console.log(error);
      }
    }

  }
  return (
    <div
      style={{
        width: "700px",
        // height: "680px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #f0f0f0",
          height: "58px",
        }}
      >
        <p style={{ color: "#012635", fontSize: "18px", fontWeight: 600 }}>Create New Role</p>
        <MdClose style={{ cursor: "pointer" }} onClick={onClose} />
      </div>
      <div style={{ height: "100%" , display:"flex" , flexDirection:"column" , overflow:"auto" }}>
        <div
          style={{
            height: "106px",
            width: "100%",
            padding: "16px",
            display: "grid",
            gridTemplateColumns: "6fr 1fr",
            gap: "8px",
          }}
        >
          <div style={{ display: "grid" }}>
            <span
              style={{
                color: "#012635",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: "500",
              }}
            >
              Role Name *
            </span>
            <input
              style={{
                padding: "8px 12px",
                border: "1px solid #D3D7DD",
                borderRadius: "8px",
                color: "#012635",
                width: "100%",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              type="text"
              name="name"
              maxLength={20}
              value={state?.name}
              onFocus={(e) => (e.target.style.borderColor = "#00bd82")}
              onBlur={(e) => (e.target.style.borderColor = "#D3D7DD")}
              placeholder="Enter Role"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div style={{ display: "grid" }}>
            <span
              style={{
                color: "#012635",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: "500",
              }}
            >
              Color
            </span>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  marginTop: "7px",
                  padding: "10px 12px",
                  border: "1px solid #D3D7DD",
                  borderRadius: "8px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <GoDotFill
                  style={{
                    color: state.color,
                    marginRight: "8px",
                    fontSize: "24px",
                  }}
                />

                <IoIosArrowDown />
              </div>

              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #D3D7DD",
                    borderRadius: "8px",
                    marginTop: "4px",
                    zIndex: "1000",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {colorOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      value={state?.color}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <GoDotFill
                        style={{
                          color: option.value,
                          marginRight: "8px",
                          fontSize: "24px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            height: "424px",
            flexGrow:1 , 
            overflow:"hidden" , 
            margin: "0px 16px 6px 16px",
            border: "solid 1px #E0E0E0",
            borderRadius: "12px",

          }}
        >
          <PermissionsArea>
            {filteredPermissions?.map((permission, index) => (
              <PermissionCheckbox
                key={index}
                data={{
                  name: permission.name,
                  children: permission.privilege.map((priv) => ({
                    name: priv,
                  })),
                }}
                isChecked={state?.permissions.includes(permission.name)}
                onCheck={handleCheck}
                checkedChildren={state?.permissions}
              />
            ))}
          </PermissionsArea>
          {/* <RolesAndPermissionsModalTable /> */}
        </div>


      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "16px",
          padding: "16px",
          height: "72px",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            border: "solid 1px #777777",
            color: "#777777",
            // width: "fit-content",
            height: "40px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 500,
            width: "100px",
            padding: "0px",
          }}
        >
          Cancel
        </button>
        
       
            <button
              // disabled={!formik.isValid || !formik.dirty}
              onClick={() => saveHandler()}
              style={{
                backgroundColor: "#00BD82",
                // width: "fit-content",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                width: "100px",
                color: "white",
                // padding: "16px",
              }}
            >
               {      isLoading ? <CircularLoader color="white"/> :   isEdit ? "Update" : "Save"}
         
            </button>
        
      </div>
    </div>
  );
};

export default RolesAndPermissionsModal;

const PermissionCheckbox = ({ data, isChecked, onCheck, checkedChildren }) => {
  const handleParentChange = () => {
    onCheck(data.name, !isChecked, data.children);
  };
  const [colaps, setColaps] = useState(false)
  const handleChildChange = (child) => {
    onCheck(child.name, !checkedChildren.includes(child.name), []);
  };

  return (
    <div>
      <FolderContainer>
        {
          colaps ?
            <IoIosArrowDown onClick={() => setColaps(!colaps)} />
            :

            <IoIosArrowForward onClick={() => setColaps(!colaps)} />

        }
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={handleParentChange}
          />
          <Checkmark className="checkmark" />
        </CheckboxContainer>
        {/* <FaFolder color="#ffb81b" /> */}
        {data.name}
      </FolderContainer>
      {data.children && (
        <SubItems style={{ display: !colaps && "none" }}>
          {data.children.map((child, index) => (
            <div style={{ display: "flex" }} key={index}>
              <div style={{ color: "white", border: "solid 1px #D3D7DD", borderRadius: "5px", borderTop: "0", borderRight: "0", borderTopLeftRadius: "0", borderEndEndRadius: "0", translate: "-2px -17px", width: "14px", height: "28px" }}>h</div>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={checkedChildren.includes(child.name)}
                  onChange={() => handleChildChange(child)}
                />
                <Checkmark className="checkmark" />
              </CheckboxContainer>
              {child.name}
            </div>
          ))}
        </SubItems>
      )}
    </div>
  );
};
