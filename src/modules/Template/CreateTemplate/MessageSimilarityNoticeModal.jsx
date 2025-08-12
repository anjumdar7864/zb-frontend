import { PiWarningFill } from "react-icons/pi";
import { MessageSimilarityNoticeStyled } from "./MessageSimilarityNoticeStyled";
import { Link } from "react-router-dom";

export const MessageSimilarityNoticeModal = ({
  onClose,
  template,
  similarMessage,
}) => {
  const type = localStorage.getItem("type");
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <MessageSimilarityNoticeStyled>
      <div className="middle">
        <div className="top">
          <div className="icon">
            <PiWarningFill size={50} />
          </div>
          <h2>Message Similarity Notice</h2>
          <div className="note">
            Please note that Messages in this Template are too similar to the
            Messages in the following Templates:
          </div>
          {template && (
            <div className="link">
              {type || user ? (
                <Link
                  to={`/templates/create-template/${template._id}`}
                  target="_blank"
                >
                  <div onClick={() => onClose()}>{template.name}</div>
                  <div>
                    <span>{similarMessage}</span>
                  </div>
                </Link>
              ) : (
                <Link to={`/templates/create-template/${template._id}`}>
                  <div onClick={() => onClose()}>{template.name}</div>
                  <div>
                    <span>{similarMessage}</span>
                  </div>
                </Link>
              )}
            </div>
          )}
          <strong>
            Repeat Messages will be most likely blocked by the carrier.
            <br />
            To avoid that, switch Templates every ~600 messages for maximum
            deliverability and response rate.
          </strong>
        </div>
      </div>
      <div className="bottom">
        <span></span>
        <button onClick={() => onClose()}>Ok</button>
      </div>
    </MessageSimilarityNoticeStyled>
  );
};
