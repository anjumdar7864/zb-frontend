import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextareaAutosize, Button } from '@mui/material';
import { FaCross } from 'react-icons/fa6';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { sendInboxNote } from '@/store/actions';
import { useSelector } from 'react-redux';
import { CircularLoader } from '@/components/common';
import toast from 'react-hot-toast';
// import CloseIcon from '@mui/icons-material/Close';

const NotePopup = ({ open, onClose }) => {
    const [noteText, setNoteText] = useState("");

    const { loading, data: userInboxItem } = useSelector(
        (s) => s.inboxUserMessageReducer
    );

    const { _id: id, notes } = userInboxItem;


    const dispatch = useDispatch();
    const sendNote = (e) => {
      
        e.preventDefault();
        dispatch(
            sendInboxNote(id, {
                title: noteText,
               
            }, ()=>{
                toast.success("Note added successfully")
                setNoteText("")
            })
        );
        onClose()
    };



    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '426px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                },
            }}
        >
            <DialogTitle
                style={{
                    height: '58px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F0F0F0',
                    color: '#012635',
                    fontSize: '18px',
                    fontWeight: 600,
                    fontFamily: 'fellix',
                }}
            >
                Add Notes
                <IconButton onClick={onClose}>
                    <MdOutlineClose style={{ color: "#012635" }} />
                </IconButton>
            </DialogTitle>
            <DialogContent
                style={{
                    padding: '24px',
                }}
            >
                <TextareaAutosize
                    minRows={3}
                    placeholder='Write notes here...'
                    onChange={(e) => setNoteText(e.target.value)}
                    maxLength={1000}
                    value={noteText}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        borderColor: '#ccc',
                    }}
                />
            </DialogContent>
            <DialogActions
                style={{
                    padding: '24px',
                    borderTop: '1px solid #F0F0F0',
                }}
            >
                <button
                    disabled={loading || noteText.length < 1}
                    onClick={(e) => sendNote(e)} style={{ backgroundColor: "#00BD82", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, color: "white", width: "100px" }} variant="contained" color="primary" >
                   {
                    loading ?
                    <CircularLoader/>
                    :
                   "Add Notes"
                   }
                   
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default NotePopup;