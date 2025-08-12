import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaFolder, FaSearch, FaSave } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import {
  GetAllUser,
  UpdateSingleUserPermission,
  ResetPermission,
  clearErrors,
  clearMessages,
  GetAllPermission,
} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ModalContainer = styled.div`
  // width: 768px;
  width: 700px ; 
  min-height: 80vh;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 16px;
  // background: #f5f5f5;
  background-color: white ; 
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  border-bottom: solid 1px #F7F7F7 ; 
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  // border: 1px solid #ccc;
  border: 1px solid #D3D7DD ; 
  // border-radius: 4px;
  border-radius: 8px ; 
  padding: 8px;
  margin-bottom: 16px;
  height: 48px ;
`;

const SearchIcon = styled(IoSearch)`
  margin: 0px 8px ; 
  color: #012635;
  width:22px ; 
  
 
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const ModalBody = styled.div`
  // padding: 16px;
  padding: 16px 0px ; 
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;



const PermissionsArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  border-radius: 10px;
  max-height: 50vh;


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
const ModalFooter = styled.div`
  padding: 16px;
  // background: #f5f5f5;
  background-color: white ; 
  border-top: solid 1px #F7F7F7 ; 
  display: flex;
  // justify-content: flex-end;
   justify-content: space-between;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 1.5rem;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.primary ? "#384ad7" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#000000")};
  cursor: pointer;
`;

const FolderContainer = styled.div`
  display: flex;
  align-items: center;
  // font-size: 1.5rem;
  font-size:18px ; 
  font-weight : 500 ; 
  line-height: 22px ; 
  color: #012635 ; 
  gap: 8px;
  cursor: pointer;
  padding:8px 0px ; 
  padding-bottom:17px ; 
`;

// const Checkbox = styled.input`
//   margin-right: 8px;
// `;

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
    background-color: #C2FFEC;
    border: solid 2px #00BD82;
    
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
  border: solid 2px #D3D7DD;

  .container input:checked ~ .checkmark {
  border: solid 2px #00BD82;
  
}
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
   width: 7px;              /* Adjust width */
  height: 12px; 
    border: solid white;
    border-width: 0 3px 3px 0; 
    transform: rotate(45deg);
    border-color: #00BD82;
  }
`;

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











// `;

const SubItems = styled.div`
  // margin-left: 24px;
  margin-left: 34px;
  display: flex;
  flex-direction: column;
  // gap: 6px;
  font-size: 16px ; 
  font-weight: 400 ; 
  line-height: 24px ; 
`;

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
          
            <IoIosArrowForward  onClick={() => setColaps(!colaps)}/>

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

const PermissionsModal = ({
  permissions,
  allowedPermissions,
  setAllowedPermissions,
  permissionId,
  refreshUsers,
  onClose,
}) => {
  const [filteredPermissions, setFilteredPermissions] = useState(permissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetPermissions, setResetPermission] = useState(allowedPermissions);
  const dispatch = useDispatch();
  const {
    // permissions,
    message,
    errors: error,
    resetLoading,
    loading,
  } = useSelector((state) => state.permissionReducer);







  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      dispatch(GetAllUser());
      
      dispatch(GetAllPermission());
      console.log("check message" , message);
      // refreshUsers();
      if(message != "Permission has been reseted"){
      onClose();

      }
    }
  }, [error, dispatch, message]);


  const handleCheck = (name, isChecked, children) => {
    let updatedPermissions;

    if (isChecked) {
      updatedPermissions = [...allowedPermissions, name];
      if (children.length > 0) {
        updatedPermissions = [
          ...new Set([
            ...updatedPermissions,
            ...children.map((child) => child.name),
          ]),
        ];
      }
    } else {
      updatedPermissions = allowedPermissions.filter((perm) => perm !== name);
      if (children.length > 0) {
        updatedPermissions = updatedPermissions.filter(
          (perm) => !children.map((child) => child.name).includes(perm)
        );
      }
    }

    setAllowedPermissions(updatedPermissions);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = permissions.filter((permission) =>
      permission.name.toLowerCase().includes(query)
    );
    setFilteredPermissions(filtered);
  };

  const handleSave = () => {
    if (allowedPermissions.length == 0) {
      toast.error("Please select atleast one permission");
    } else {
      const finalResult = {
        permissions: allowedPermissions,
      };
      dispatch(UpdateSingleUserPermission(finalResult, permissionId));
    }
  };

  const handleResetPermissions = () => {
    dispatch(ResetPermission(permissionId , (data)=>{
      // console.log("kam khlass" , data?.data?.permissions);
      setAllowedPermissions(data?.data?.permissions)
      
    }));
  };

  useEffect(() => {
    refreshUsers();
  }, [dispatch]);

  return (
    <ModalContainer>
      <ModalHeader>
        <span style={{ color: "#012635", fontSize: "18px", fontWeight: 600, lineHeight: "26px" }}>Permissions</span>
        <div onClick={onClose}>
          <IoMdClose />
        </div>
      </ModalHeader>
      <ModalBody>
        <div style={{ borderBottom: "solid 1px #F7F7F7", padding: "0px 16px", marginBottom: "10px" }}>
          <SearchBar>
            <SearchIcon style={{ fontSize: '23px' }} />
            <SearchInput
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBar>
        </div>
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
              isChecked={allowedPermissions.includes(permission.name)}
              onCheck={handleCheck}
              checkedChildren={allowedPermissions}
            />
          ))}
        </PermissionsArea>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => handleResetPermissions()}
          disabled={resetLoading}
          style={{ color: "#012635", fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}
        >
          {resetLoading ? "Reseting Permissions..." : "Reset Permissions"}
        </Button>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button style={{ border: "solid 1px #777777", borderRadius: "8px", width: "100px", color: "#777777", fontSize: "14px", lineHeight: "24px", fontWeight: 400 }} onClick={onClose}>Cancel</Button>
          <Button style={{ backgroundColor: "#00BD82", color: "white", width: "100px", borderRadius: "8px", fontSize: "14px", lineHeight: "24px", fontWeight: 400 }} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>

      </ModalFooter>
    </ModalContainer>
  );
};

export default PermissionsModal;
