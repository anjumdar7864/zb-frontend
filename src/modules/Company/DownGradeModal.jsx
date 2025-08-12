import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import { commonAPICall } from '@/services/api/common';
import toast from 'react-hot-toast';
import { CircularLoader } from '@/components/common';
import { logOut } from '@/store/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 548,
  height: 226,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: "16px",
  boxShadow: 24,
  // p: 4,
};


export default function DownGradeModal({ downGradeStep, setDownGradeStep, downGradePakage, marketRemove, setMarketRemove }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoader] = React.useState(false);
  const { curruntPackageTitle, selectedPackageTitle, selectedPackagePrice, selectedPackageId, data } = downGradePakage
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hadleUpgrade = async () => {
    if (data?.limit < data?.outBoundNumber.length) {
      setDownGradeStep(2)

    } else {
      setLoader(true)
      const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
      const payload = {
        tenantId: user._id,
        stripeCustomerId: user?.stripeCustomerId,
        newSubscriptionId: selectedPackageId,

      };
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.POST,
        `${ENDPOINTS.DOWNGRADE_SUBSCRIPTION}`,
        payload
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (data?._id) {
        toast.success(`${selectedPackageTitle.toUpperCase()} has been subscribe and it will start from next month`)
        setDownGradeStep(0)
        setLoader(false)
      } else {
        toast.error({ message })
        setLoader(false)
      }
    }
  }

  return (
    <div>
      {/* <Button onClick={() => setDownGradeStep(1)}>Open modal</Button> */}
      <Modal
        open={downGradeStep == 1}
        onClose={() => setDownGradeStep(0)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between", height: "58px", alignItems: "center", padding: "0px 16px", borderBottom: "solid 1px #F0F0F0" }}>
            <div style={{ width: "fit-content", fontSize: "18px", fontWeight: 600, lineHeight: "26px", color: "#012635" }}>Downgrade Plan</div><div style={{ width: "fit-content", cursor: "pointer" }} onClick={() => {
              setDownGradeStep(0)
              setMarketRemove = (false)
            }}><IoMdClose style={{ fontSize: "24px", color: "#012635" }} /></div>
          </div>
          <div style={{ height: "80px", display: 'flex', alignItems: "center", padding: "0px 16px" }}>
            {
              marketRemove && selectedPackageId == "6744614ba4d142ed16ea9c97" ?
                <div style={{ color: "#012635", fontSize: "16px", fontWeight: 400 }}>
                  Are you sure you want to remove extra market
                </div>
                :
                <div style={{ color: "#012635", fontSize: "16px", fontWeight: 400 }}>
                  You’re currently subscribed to the<span style={{ fontWeight: 500 }}> {curruntPackageTitle.toUpperCase()}</span>   plan. Are you sure want to downgrade to <span style={{ fontWeight: 500 }}>{selectedPackageTitle.toUpperCase()}</span>  plan ($<span>{selectedPackagePrice}</span>/month)?
                </div>
            }

          </div>
          <div style={{ display: "flex", justifyContent: "end", gap: "16px", height: "88px", alignItems: "center", padding: "0px 16px", borderTop: "solid 1px #F0F0F0" }}>
            <div onClick={hadleUpgrade} style={{ backgroundColor: "#00BD82", cursor: "pointer", borderRadius: "8px", color: "white", width: "121px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {
                loading == false ?
                  " Yes, Go Ahead!"
                  :
                  <CircularLoader color={"white"} />
              }

            </div>
            <div onClick={() => {
              setDownGradeStep(0)
              setMarketRemove(false)
            }} style={{ border: "solid 1px #00BD82", cursor: "pointer", borderRadius: "8px", color: "#00BD82", width: "145px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>No, I am good!</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
