import { useState, useEffect, useContext, useRef } from "react";
import { Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { markAsRead, markAsUnRead } from "@/store/actions"
import { SelectedTabContext, SelectedInboxItemContext } from "./SelectedInboxItemContext";
import { MoreOptionsStyled } from "./styles";
import MarkAsReadModall from "./MarkAsReadModall";
import toast from "react-hot-toast";

const ActionMenu = ({
  menuAnchor,
  setMenuAnchor,
  message,
  setOpenRemainder,
  setOpenNote,
  selectedId,
}) => {
  const { setSelectedTabIndex, setSelectedRemainderId } = useContext(SelectedTabContext);
  const {

    selectedPhone,

  } = useSelector((s) => s.inboxUserMessageReducer);
  const { setSelectedUserInbox } = useContext(SelectedInboxItemContext);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const targetElement = ref.current;
      if (targetElement && targetElement.contains(e.target)) {
        setIsMouseHover(true);
      } else {
        setIsMouseHover(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // const markAsReadOrUnRead = (e) => {
  //   e.stopPropagation();
  //   setMenuAnchor(null);
  //   if (message.isRead) {
  //     dispatch(markAsUnRead(message._id , phone1=false , phone2=false , phone3=false ));
  //   } else {
  //     dispatch(markAsRead(message._id));
  //   }
  // }

  const checkCondition = (isREadCheck, number) => {
    if (isREadCheck && number) {
            return true
    }else{
      return false
    }
  }


  const markAsReadOrUnRead = (e) => {
    e.stopPropagation();
    setMenuAnchor(null);
    let phoneObj = {}




    if (message._id == selectedId) {
      const keyVAl = `phone${selectedPhone}`

      // phoneObj = { [keyVAl]: message.isRead ? true : false }
      phoneObj = { [keyVAl]: true }
        dispatch(markAsUnRead(message._id, phoneObj));

      // if (checkCondition(message.isRead, message?.responsePhone?.phone1) || checkCondition(message.isReadPhone2, message?.responsePhone?.phone2) || checkCondition(message.isReadPhone3, message?.responsePhone?.phone3) ) {
      //   dispatch(markAsUnRead(message._id, phoneObj));
      // } else {
      //   dispatch(markAsRead(message._id, phoneObj));
      // }
    }

  }

  const handleSubmit = (e) => {
    if(!e.phone1 && !e.phone2 && !e.phone3) {
toast.error("Please select at least one phone number")
      return
    }
    setOpen(false)
    if (checkCondition(message.isRead, message?.responsePhone?.phone1) || checkCondition(message.isReadPhone2, message?.responsePhone?.phone2) || checkCondition(message.isReadPhone3, message?.responsePhone?.phone3) ) {
      dispatch(markAsUnRead(message._id, e));
    } else {
      dispatch(markAsRead(message._id, e));
    }

  }


  return (
    <>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
      >
        <MoreOptionsStyled>
          <button
            // onClick={markAsReadOrUnRead}
            onClick={(e) => {
              if (message._id == selectedId) {
                markAsReadOrUnRead(e)
              } else {
                e.stopPropagation();
                setMenuAnchor(null);


                setOpen(true)

              }
            }}
          >
            {/* {message.isRead || message.isReadPhone2 || message.isReadPhone3 ? "Mark As Unread" : "Mark As Read"} */}
            {message._id == selectedId ? "Mark As Unread" : checkCondition(message.isRead, message?.responsePhone?.phone1) || checkCondition(message.isReadPhone2, message?.responsePhone?.phone2) || checkCondition(message.isReadPhone3, message?.responsePhone?.phone3)  ? "Mark As Unread" : "Mark As Read"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchor(null);
              setOpenRemainder(message);
              // setSelectedRemainderId("asdfasdf");
            }}
          >
            {message.reminder ? "Edit Reminder" : "Set Reminder"}
          </button>
          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setMenuAnchor(null);
            //   setSelectedUserInbox(message);
            //   setSelectedTabIndex(2);
            // }}
            onClick={() => {
              setOpenNote(true)
              setMenuAnchor(null);
            }}
          >
            Add Note
          </button>
        </MoreOptionsStyled>
      </Menu>
      <MarkAsReadModall open={open} setOpen={setOpen} message={message} handleSubmit={handleSubmit} read={message?.isRead} />
    </>
  );

}

export default ActionMenu;