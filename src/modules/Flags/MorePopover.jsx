import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import styles from './Flags.module.css'
// import styles from "../../DirectImport/DirectImport.module.css";


const MorePopover = ({ children, setOpenDelete, setOpenReplace, number , setCurrentNumber , setOriginalNumber , orignalNumber , isDeleteAble , isReplaceAble}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if(!isReplaceAble && !isDeleteAble){
      
    }else{
      setAnchorEl(event.currentTarget);

    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span onClick={handleClick}>{children}</span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{display:!isReplaceAble && "none"}} onClick={() => {
          if(isReplaceAble){
            setOpenReplace(true)
            setCurrentNumber(number)
            setOriginalNumber(orignalNumber)
          }
       
        }} className={styles.tbleReplace}>Replace</div>

        <div style={{display:!isDeleteAble && "none"}} onClick={() => {
          if(isDeleteAble){
            setOpenDelete(true)
            setCurrentNumber(number)
            setOriginalNumber(orignalNumber)
          }
         
        }} className={styles.tbleReplace}>Delete</div>

      </Popover>
    </div>
  );
};

export default MorePopover;
