import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDripForInbox, assignDripToInbox } from "@/store/actions";
import Assets from "@/assets";
import { DripAutomationModalStyled } from "../styles";
import { RxCross2 } from "react-icons/rx";
import { FaTint } from "react-icons/fa";
import toast from "react-hot-toast";

const DripAutomationModal = ({ inboxId, onClose }) => {
  const dispatch = useDispatch();
  const { drips } = useSelector((s) => s.dripAutomationReducer);
  const { automationLoading } = useSelector((s) => s.inboxUserMessageReducer);

  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSelect, setHoveredSelect] = useState(null);
  const [viewMessage, setViewMessage] = useState({});
  const [selectedDripId, setSelectedDripId] = useState("");

  useEffect(() => {
    dispatch(GetAllDripForInbox());
  }, []);

  const handleViewMessagesHover = (index) => {
    setHoveredItem(index);
  };

  const handleViewMessagesLeave = () => {
    setHoveredItem(null);
  };

  const handleSelectHover = (index) => {
    setHoveredSelect(index);
  };

  const handleSelectLeave = () => {
    setHoveredSelect(null);
  };

  const normalStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    padding: "0.6rem 1rem",
    backgroundColor: "#00BD82",
    borderRadius: "0.5rem",
    height:"40px" , 
    // width:"129px"
  };

  const hoverStyle = {
    backgroundColor: "#299781",
  };

  const normalStyleForSelect = {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    padding: "0.6rem 1rem",
    backgroundColor: "#3086EE",
    borderRadius: "0.5rem",
    marginLeft: "1.5rem",
    height:"40px" , 
    width:"100px"
  };

  const hoverStyleForSelect = {
    backgroundColor: "#1192f6",
  };

  const handleViewMessage = (id) => {
    setSelectedDripId(id);
    setViewMessage(drips.find((item) => item._id.toString() === id.toString()));
  };

  return (
    <DripAutomationModalStyled Styled ChevronDown={Assets.Images.ChevronDown}>
      <div className="top">
        <div className="title" >Select a Drip Automation</div>
        <div className="right" onClick={onClose} style={{ cursor: "pointer" }}>
          <RxCross2 />
        </div>
      </div>
      <div className="bottom">
        <div className="top">
          {Object.keys(viewMessage).length != 0 ? (
            <p
              className="heading"
              style={{
                fontWeight: "600",
                fontSize: "13px",
                color: "black",
              }}
            >
              {viewMessage.name}
            </p>
          ) : (
            <p className="heading">Name</p>
          )}
        </div>
        <div className="bottom">
          {Object.keys(viewMessage).length != 0
            ? viewMessage.messages.map((message, i) => (
                <div className="item" key={i}>
                  <div>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: "black",
                      }}
                    >{`Message ${i + 1}`}</span>
                    <span
                      style={{
                        marginLeft: "1rem",
                        padding: "0.2rem 1rem",
                        backgroundColor: "#36a3f7",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "9px",
                      }}
                    >
                      {message?.day && message.day} days
                    </span>
                  </div>
                  <div>
                    <p>{message?.content && message.content}</p>
                  </div>
                </div>
              ))
            : drips.length > 0
            ? drips.map((drip, i) => (
                <div
                  className="item"
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{drip.name}</p>
                  <div>
                    <button
                      style={{
                        ...normalStyle,
                        ...(hoveredItem === i ? hoverStyle : {}),
                      }}
                      onMouseEnter={() => handleViewMessagesHover(i)}
                      onMouseLeave={handleViewMessagesLeave}
                      onClick={() => handleViewMessage(drip._id)}
                    >
                      view messages
                    </button>
                    <button
                      disabled={automationLoading}
                      style={{
                        ...normalStyleForSelect,
                        ...(hoveredSelect === i ? hoverStyleForSelect : {}),
                      }}
                      onMouseEnter={() => handleSelectHover(i)}
                      onMouseLeave={handleSelectLeave}
                      onClick={(e) =>{
                        console.log("chulling this", inboxId, drip._id);
                        
                        dispatch(
                          assignDripToInbox(
                            inboxId,
                            { dripAutomationId: drip._id },
                            () => {
                              toast(`status was added`, {
                                style: {
                                  backgroundColor: "#36a3f7",
                                  color: "white",
                                },
                              });
                              onClose(e);
                            }
                          )
                        )
                      
                      
                      }


                      }
                    >
                      {/* <FaTint /> */}
                      Select
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
        {/* style={{ backgroundColor: "#f8f8f8", height: "7rem" }} */}
        {Object.keys(viewMessage).length != 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              style={{
                border: "1px solid silver",
                padding: "0.2rem 1rem",
                fontSize: "12px",
                backgroundColor: "white",
                borderRadius: "0.2rem",
              }}
              onClick={() => setViewMessage({})}
            >
              Back
            </button>
            <button
              disabled={automationLoading}
              style={{
                marginLeft: "1rem",
                marginRight: "3rem",
                padding: "0.8rem 2rem",
                backgroundColor: "#36a3f7",
                color: "white",
                borderRadius: "0.5rem",
                fontSize: "9px",
              }}
              onClick={(e) =>
                dispatch(
                  assignDripToInbox(
                    inboxId,
                    { dripAutomationId: selectedDripId },
                    () => {
                      toast(`status was added`, {
                        style: {
                          backgroundColor: "#36a3f7",
                          color: "white",
                        },
                      });
                      onClose(e);
                    }
                  )
                )
              }
            >
              <FaTint />
              <span style={{ marginLeft: "0.3rem" }}>Select</span>
            </button>
          </div>
        ) : (
          <div>
            {/* <button
              type="button"
              onClick={onClose}
              style={{
                marginTop: "1.5rem",
                padding: "0.8rem 2.5rem",
                marginLeft: "75%",
                border: "1px solid silver",
                color: "black",
                backgroundColor: "white",
              }}
            >
              Cancel
            </button> */}
          </div>
        )}
      </div>
    </DripAutomationModalStyled>
  );
};

export default DripAutomationModal;
