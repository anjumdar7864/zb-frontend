import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './ErrorPopup.module.css';
import { IoMdCloseCircle } from 'react-icons/io';
import { CircularLoader } from '..';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, errorMessage, cat } = props;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    padding: "0px",
    borderRadius: "12px",
    overflow: "hidden"

  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{ marginBottom: "20px", width: "450px" }}>
        <div style={{ fontSize: "20px", display: "flex", alignItems: "center" }} className={styles.company_logo}>{cat == "error" ? <IoMdCloseCircle style={{ marginRight: "10px", color: "#FF5D3E", fontSize: "32px" }} /> :cat == "loading" ?<span style={{marginRight:"20px"}}><CircularLoader/></span>  :  <FaCheckCircle style={{marginRight:"10px" , color:"#00BD82" , fontSize:"32px" }} />}<span>{cat == "error" ? "Error" :cat == "loading" ? "Loading" :  "Success"}</span></div>
        <div style={{ color: "#073F56", marginLeft: "40px" }}>
          {errorMessage ? errorMessage : "error message"}
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ open, setOpen, errorMessage, cat = "error" }) {
  // const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        errorMessage={errorMessage}
        cat={cat}
      />
    </div>
  );
}