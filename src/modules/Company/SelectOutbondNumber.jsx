import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import styled from '@emotion/styled';
import styles from './CompanyA.module.css';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { commonAPICall } from '@/services/api/common';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
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
  height: 410,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: "16px",
  boxShadow: 24,
  // p: 4,
};
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
  height: 24px;
  width: 24px;
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
    left: 7px;
    top: 2px;
    width: 7px; /* Adjust width */
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    border-color: #00bd82;
  }
`;

export default function SelectOutbonNumber({ downGradeStep, setDownGradeStep, downGradePakage, marketRemove, setMarketRemove }) {
  const [open, setOpen] = React.useState(false);
  const [numberList, setNumberList] = React.useState([]);
  const [loading, setLoader] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { curruntPackageTitle, selectedPackageTitle, selectedPackagePrice, selectedPackageId, data } = downGradePakage
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const arrList = [
    "+1 414 378 7255",
    "+1 414 378 7255",
    "+1 414 378 7255",
    "+1 414 378 7255",
    "+1 414 378 7255",
    "+1 414 378 7255",
  ]

  const idList = [
    "67445e5cf4d8d6cff7dbde85",
    // "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
    "67445d36f4d8d6cff7dbde60",
  ]




  const handleCheck = (number) => {
    const checkIndex = numberList.findIndex((dataNumber) => number === dataNumber);

    if (checkIndex !== -1) {
      const updatedList = [...numberList];
      updatedList.splice(checkIndex, 1);
      setNumberList(updatedList); // Assuming you're using React state to manage the list
    } else {
      setNumberList((prev) => [...prev, number])
    }
  }

  useEffect(() => {
    // Initialize numberList with the first 5 numbers from arrList
    // setNumberList(arrList.slice(0, 5));
    if (data?.outBoundNumber?.length > 0) {
      setNumberList(data?.outBoundNumber);
    }
  }, [data]);


  const hadleUpgrade = async () => {
    if (numberList?.length != data?.limit && idList.findIndex((id) => id == selectedPackageId) > -1) {
      toast.error(`you can only select ${data?.limit} outbondNumber`)

    } else if (idList.findIndex((id) => id == selectedPackageId) == -1 && numberList?.length < data?.limit) {
      toast.error(`You can select up to ${data?.limit} outbound numbers.`)

    } else if (idList.findIndex((id) => id == selectedPackageId) == -1 && data?.outBoundNumber.length == numberList?.length) {
      toast.error("Please unselect at least one number")

    } else {
      setLoader(true)
      const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
      const payload = {
        tenantId: user._id,
        stripeCustomerId: user?.stripeCustomerId,
        newSubscriptionId: selectedPackageId,
        phone: numberList

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
        if (marketRemove) {
          toast.success(`Outbound numbers have been removed from ${curruntPackageTitle.toUpperCase()}`)
          setMarketRemove(false)
        } else {
          toast.success(`${selectedPackageTitle.toUpperCase()} has been subscribe and it will start from next month`)

        }
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
      {/* <Button onClick={() => setDownGradeStep(2)}>Open modal</Button> */}
      <Modal
        open={downGradeStep == 2}
        onClose={() => setDownGradeStep(0)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between", height: "58px", alignItems: "center", padding: "0px 16px", borderBottom: "solid 1px #F0F0F0" }}>
            <div style={{ width: "fit-content", fontSize: "18px", fontWeight: 600, lineHeight: "26px", color: "#012635" }}>Select Outbound number</div><div style={{ width: "fit-content" }}><IoMdClose 
            onClick={() => {
              setDownGradeStep(0)
              setMarketRemove(false)
            }} style={{ fontSize: "24px", color: "#012635", cursor: "pointer" }} /></div>
          </div>
          <div style={{ height: "128px", display: 'flex', alignItems: "center", padding: "0px 16px" }}>
            <div style={{ color: "#012635", fontSize: "16px", fontWeight: 400 }}>
              Hey, just a heads up! You can only pick <span>{data?.limit}</span> outbound numbers, so choose your favorites. Don’t worry, your data is safe and sound! You can still chat with the previous batch numbers, but you won’t be able to create new batches.
            </div>
          </div>
          <div className={styles.customScroll} style={{ height: "136px", padding: "16px 24px", display: 'flex', flexDirection: "column", gap: "16px", overflow: "auto" }}>
            {

              data?.outBoundNumber.map((data, index) => {
                return (
                  <div style={{ display: "flex" }}>
                    <CheckboxContainer>
                      <input checked={numberList.find((num) => data == num) ? true : false} onClick={() => handleCheck(data)} type='checkbox' />
                      <Checkmark className="checkmark" />
                    </CheckboxContainer>
                    <div style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#151A28" }}>
                      {data}
                    </div>

                  </div>
                )
              })
            }
          </div>
          <div style={{ display: "flex", justifyContent: "end", gap: "16px", height: "88px", alignItems: "center", padding: "0px 16px", borderTop: "solid 1px #F0F0F0" }}>
            <div onClick={hadleUpgrade} style={{ backgroundColor: "#00BD82", cursor: "pointer", borderRadius: "8px", color: "white", width: "121px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {
                loading ?
                  <CircularLoader color='white' />
                  :
                  "Yes, Go Ahead!"
              }

            </div>
            <div onClick={() => setDownGradeStep(0)} style={{ border: "solid 1px #00BD82", cursor: "pointer", borderRadius: "8px", color: "#00BD82", width: "145px", height: "40px", fontSize: "16px", fontWeight: 500, lineHeight: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>No, I am good!</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
