import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdOutlineClose } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import styles from "./MarkitMaster.module.css";
import Select, { components } from "react-select";
import PhoneInput from 'react-phone-input-2';
import { SlArrowDown } from 'react-icons/sl';
import { LuAsterisk } from 'react-icons/lu';
import { editOutbondNumber } from '@/store/actions/market.action';
import { useDispatch } from 'react-redux';
import { CircularLoader } from '@/components/common';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: "16px",
};

const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <SlArrowDown style={{ color: "#012635" }} />
  </components.DropdownIndicator>
);

const EditBondNumberModal = ({ children, title = "Add Outbound Number", rowData = {}, rootData = {}, tenantId, updateListing, phoneNumber = '' }) => {
  const [open, setOpen] = React.useState(false);
  const [getRowData, setGetRootData] = React.useState({})

  const [outbondNumber, setOutbondNumber] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState('')


  useEffect(() => {
    setGetRootData((prevData) => ({
      ...prevData,
      number: `1${rowData.number}`,  // Update the number field in state
    }));
  }, [rowData])


  const dispatch = useDispatch()
  const styleWarning = {
    display: "flex",
    backgroundColor: "#D6E7FC",
    borderRadius: "12px",
    height: "60px",
    padding: "0px 16px",
    alignItems: "center",
    gap: "16px",
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "solid 1px #d3d7dd",
      borderColor: state.isFocused ? '#5BF1B2' : '#5BF1B2',  // Change border color
      height: '48px',                                      // Set height
      minHeight: '100%',                                   // Ensure it respects the height
      width: '100%',                                      // Set width
      borderRadius: '8px',                                 // Set border radius
      boxShadow: state.isFocused ? 'none' : 'none', // Add shadow on focus
      '&:hover': {
        border: 'solid 1px #5BF1B2',                             // Change border color on hover
      },
      outline: 'none',
      color: "#777777"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#777777',                                       // Placeholder color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      // color: '#3498db',                                    // Dropdown icon color
      '&:hover': {
        // color: '#2980b9',                                   // Dropdown icon hover color
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',                                     // Remove the separator
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#777777", // Color of selected value text
    }),
  };
  const handleClose = () => {
    setOpen(false)
    setLoading(false)

  };
  const handleOpen = () => setOpen(true);



  const handleSvae = async () => {
    if (outbondNumber !== rowData?.number && outbondNumber !== "") {
      const result = outbondNumber.toString().replace(countryCode.toString(), '');
      setLoading(true);

      await dispatch(
        editOutbondNumber(
          {
            body: {
              tenantId: tenantId,
              name: rootData.name,
              phone: rootData.phone,
              newPhoneNumber: result,
              // newPhoneNumber: outbondNumber,
              oldPhoneNumber: rowData?.number,
            },
            _id: rootData?._id,
          },
          (e) => {


            // onSuccess callback
            toast.success("Outbond number request has been accepted");
            updateListing && updateListing()
            setLoading(false);
            setOpen(false)
          },
          (error) => {
            // onError callback
            setLoading(false);
            toast.error(error?.response?.data?.message);
            console.error("Error updating outbound number:", error);
          }
        )
      );
    }
  };

  const commonHandler = (e, phoneData) => {
    // console.log("check phone value" , e);
    setCountryCode(phoneData?.dialCode)
    setOutbondNumber(e)

  }

  console.log("rowData", rowData);
  
  return (
    <div>
      <div style={{ cursor: "pointer", display: "flex" }} onClick={handleOpen}>{children}</div>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ padding: "16px", color: "#012635", fontSize: "18px", fontWeight: 600, lineHeight: "26px", borderBottom: "solid 1px #F7F7F7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{title}</span>
            <span><MdOutlineClose onClick={() => handleClose()} style={{ fontSize: "24px", cursor: "pointer" }} /></span>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div style={styleWarning}>
              <div><RiErrorWarningFill style={{ fontSize: "28px", color: "#005ABB", }} /></div>
              <div style={{ color: "#012635", fontWeight: 500, fontSize: "14px", lineHeight: "22px" }}>Please note that this number/user will be charged according to your current subscription</div>
              <div style={{ color: "#012635", fontWeight: 500, fontSize: "16px", lineHeight: "24px", cursor: "pointer" }}>Accept</div>
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ width: "50%" }}>
                <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Market Name<LuAsterisk style={{ color: "red" }} /></label>
                <input disabled placeholder='Eastern 470' value={rootData.name} style={{ backgroundColor: '#F0F0F0' }} className={styles.outbondInput} />
              </div>
              <div style={{ width: "50%" }}>
                <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>{title === "Add Outbound Number" ? "Outbound Number" : "Call Forwarding Number"}<LuAsterisk style={{ color: "red" }} /></label>
                <PhoneInput
                  country={'us'}
                  disableDropdown={true}
                  disabled={title === "Add Outbound Number" && !rowData?.isMessageSend ? true : false}
                  // value={rowData?.number}
                  value={getRowData?.number}
                  onChange={(phone, data) => commonHandler(phone, data)}
                  inputStyle={{ border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", color: "#777777" }}
                />
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ width: "50%" }}>
                <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Area Code<LuAsterisk style={{ color: "red" }} /></label>
                <Select
                  isDisabled={true}
                  value={{ label: rootData?.areaCode, id: rootData?.areaCode }}
                  // onChange={(val) => areaCodeHandler(val || "", "areaCode")}
                  styles={customStyles}

                  components={{ DropdownIndicator: CustomDropdownIndicator }}
                  isSearchable
                  placeholder="Search..."
                />
              </div>
              <div style={{ width: "50%" }}>
                <label style={{ color: "#012635", fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}>Time Zone<LuAsterisk style={{ color: "red" }} /></label>
                <input disabled={true} name="time_sone" value={rootData.abbrevation} placeholder='Time Zone' style={{ backgroundColor: title == "Add Outbound Number" && '#F0F0F0' }} className={styles.outbondInput} />

              </div>
            </div>
          </div>



          <div style={{ padding: "16px", borderTop: "solid 1px #F0F0F0", height: "72px", display: "flex", justifyContent: "end", gap: "16px" }}>
            <div onClick={() => handleClose()} style={{ color: "#777777", border: "solid 1px #777777", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              Cancel
            </div>
            {
              loading ?
                <div style={{ color: "white", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", }}>

                  <CircularLoader />
                </div>
                :
                <div onClick={handleSvae} style={{ color: "white", backgroundColor: "#00BD82", borderRadius: "8px", height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  Save
                </div>
            }
          </div>

        </Box>
      </Modal>
    </div>
  );
}

export default EditBondNumberModal;
