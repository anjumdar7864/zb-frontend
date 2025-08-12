import  React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import { MdClose } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    backgroundColor: 'transparent',
    // boxShadow: 24,
    // p: 4,
  };
  const opts = {
    height: '390',
    width: '700',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
const VideoPlyar = ({open , setOpen , id}) => {
    // const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onReady = (event) => {
        event.target.playVideo();
      };
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display:"flex" , justifyContent:"flex-end" , alignItems:"center" ,     color:"white" , fontSize:"24px" , marginBottom:"50px" }}><IoMdCloseCircleOutline onClick={handleClose} style={{ cursor: "pointer" }}  /></div>
                    <div>
                    <YouTube videoId={id} opts={opts} onReady={onReady} />

                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default VideoPlyar
