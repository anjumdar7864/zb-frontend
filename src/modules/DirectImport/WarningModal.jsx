import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './WarningModal.module.css'
import Assets from '@/assets';
import SwitchButton from "@/components/common/Switch/Switch";
import { FiInfo } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { LightTooltip } from '@/components/common';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "95vw",
  maxWidth: "763px",
  borderRadius: '24px', // Fixed capitalization
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  padding: "28px"
};


const WarningModal = ({ setOpen, open, check, setCheck, handleImport, optIn, setOptIn, setLeadSource, leadSource }) => {
  //   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user")) ??
    JSON.parse(localStorage.getItem("user"));
  const handleActive = (row, value) => {
    console.log(value)
    setCheck(value)
  }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
            <div className={styles.title}><FaShieldAlt />DNC & Opt-In Verification</div>
            <div onClick={() => {
              setOpen(false)
              setOptIn(null)
            }} style={{ cursor: "pointer" }}>
              <IoClose size={24} />
            </div>
          </div>
          <div style={{ fontSize: "16px", marginTop: "16px", fontWeight: 500 }}>
            We can automatically scrub your imported lead list against the National Do Not Call (DNC) registry to keep your outreach compliant.

          </div>
          <br />
          <div style={{ backgroundColor: "#F5F5F5", color: "#2D2D2D", padding: "16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05) ", lineHeight: "1.6" }}>
            <div>
              <span style={{ fontWeight: 600, color: "#1F1F1F" }}>Toggle ON:</span> Ensures full DNC compliance, filtering out any numbers registered on the national DNC list.
            </div>
            <br />
            <div>
              <span style={{ fontWeight: 600, color: "#1F1F1F" }}>Toggle OFF:</span>  Includes all imported leads for maximum reach, but increases your risk of non-compliance.

            </div>

          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
            <div>Would you like to enable National DNC filtering?</div>
            <LightTooltip
              placement="top"
              arrow
              title={
                <div>If 10Dlc is not approved.You cannot turn off the toggle</div>
              }
            >

              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "10px", color: "#777777" }}>OFF</span>
                <SwitchButton
                  disabled={user?.isTenDlcSubmit != "Accept" ? true : false}
                  active={check}
                  // row={arr}
                  handleActive={handleActive}
                />
                <span style={{ fontSize: "10px", color: "#00BD82" }}>ON</span>
              </div>
            </LightTooltip>



          </div>

          <div style={{ fontSize: "16px", marginTop: "16px", fontWeight: 500 }}>
            Lead Source Confirmation <b>Are the leads you are importing confirmed opt-ins</b> ?


          </div>
          <br />
          {/* <div style={{ backgroundColor: "#F5F5F5", color: "#2D2D2D", padding: "16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05) ", lineHeight: "1.6" }}>
                        <div>
                            <span style={{ fontWeight: 600, color: "#1F1F1F" }}>Yes:</span> all leads are confirmed opt-ins
                        </div>
                        <br />
                        <div>
                            <span style={{ fontWeight: 600, color: "#1F1F1F" }}>No:</span> or I’m not sure

                        </div>

                    </div> */}
          <div
            style={{
              backgroundColor: "#F5F5F5",
              color: "#2D2D2D",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              lineHeight: "1.6",
            }}
          >
            <style>
              {`
          .custom-radio {
            position: relative;
            padding-left: 28px;
            cursor: pointer;
            user-select: none;
            display: inline-block;
            font-size: 16px;
          }

          .custom-radio input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }

          .custom-radio span.radio-mark {
            position: absolute;
            top: 2px;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: white;
            border: 2px solid #ccc;
            border-radius: 50%;
            transition: border-color 0.2s ease;
          }

          .custom-radio input:checked ~ span.radio-mark {
            border-color: #00BD82;
            background-color: #00BD82;
          }

          .custom-radio span.radio-mark:after {
            content: "";
            position: absolute;
            display: none;
          }

          .custom-radio input:checked ~ span.radio-mark:after {
            display: block;
          }

          .custom-radio span.radio-mark:after {
            top: 4px;
            left: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
          }
        `}
            </style>

            {/* <label className="custom-radio" style={{ display: "block", marginBottom: "12px" }}>
              <input
                type="radio"
                name="optin"
                value="yes"
                checked={optIn === true}
                onChange={() => setOptIn(true)}
              />
              <span className="radio-mark"></span>
              <span style={{ fontWeight: 600, color: "#1F1F1F", marginLeft: "8px" }}>Yes:</span> all leads are confirmed opt-ins
            </label> */}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
              <label className="custom-radio" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  name="optin"
                  value="yes"
                  checked={optIn === true}
                  onChange={() => setOptIn(true)}
                />
                <span className="radio-mark"></span>
                <span style={{ fontWeight: 600, color: "#1F1F1F" }}>Yes:</span> all leads are confirmed opt-ins
              </label>

              {optIn === true && (
                <>
                  <style>
                    {`
          .modern-dropdown {
            padding: 3px 28px 3px 10px;
            border-radius: 8px;
            background-color: #ffffff;
            font-size: 12px;
            color: #2D2D2D;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='20,50 70,100 120,50' fill='none' stroke='%23999' stroke-width='15' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 12px 12px;
            border: 1px solid #D0D5DD;
            
            outline: none;
            min-width: 130px;
            height: 32px;
         
            transition: border-color 0.2s ease;
            cursor: pointer;
          }

          .modern-dropdown:hover {
            border-color: #00BD82;
          }
        `}
                  </style>

                  <select
                    className="modern-dropdown"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                  >
                    <option value="" >Select source</option>
                    <option value="website_form">Website Form</option>
                    <option value="email_signup">Email Signup</option>
                    <option value="sms_consent">SMS Consent</option>
                    <option value="event_signup">Event Signup</option>
                    <option value="other">Other</option>
                  </select>
                </>
              )}
            </div>


            <label className="custom-radio">
              <input
                type="radio"
                name="optin"
                value="no"
                checked={optIn === false}
                onChange={() => {
                  setOptIn(false)
                  setLeadSource("")
                }}
              />

              <span className="radio-mark"></span>
              <span style={{ fontWeight: 600, color: "#1F1F1F", marginLeft: "8px" }}>No:</span> or I’m not sure
            </label>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "end", padding: "10px 0px" }}>




            <div style={{ backgroundColor: "#fff7ed", padding: "10px", borderRadius: "8px" }}><span style={{ color: "#b45309", fontWeight: 600 }}>⚠ Important</span>: To stay compliant with federal regulations and minimize risk, only import leads who have expressly opted in to receive communications from you. Proceeding is at your discretion.</div>


          </div>

          <div className={styles.footer}>
            {/* <div>
                            <div className={styles.settings}>Cookies settings</div>
                        </div> */}
            <div className={styles.buttonsContainer}>
              <button onClick={handleImport} className={styles.accept} >Import</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default WarningModal
