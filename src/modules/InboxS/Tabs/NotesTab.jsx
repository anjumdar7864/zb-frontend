import { useContext, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { If, Then, Else } from "react-if";
import { conforms, size } from "lodash-es";

import {
  getInboxNotesList,
  sendInboxNote,
  deleteInboxNote,
} from "@/store/actions";

import { NotesTabStyled } from "../styles";
import { IoMdTrash } from "react-icons/io";

const NotesTab = () => {
  const { loading, data: userInboxItem } = useSelector(
    (s) => s.inboxUserMessageReducer
  );
  const { _id: id, notes } = userInboxItem;
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState("");

  // useEffect(() => {
  //   dispatch(getInboxNotesList(id));
  // }, [id]);

  useEffect(() => {
    setNoteText("");
  }, [notes]);

  const sendNote = (e) => {
    e.preventDefault();
    dispatch(
      sendInboxNote(id, {
        title: noteText,
      })
    );
  };

  const deleteNote = (e, note) => {
    e.preventDefault();
    dispatch(
      deleteInboxNote(id, {
        noteId: note._id,
      })
    );
  };

  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  return (
    <NotesTabStyled style={{ padding: "0px", height: "100%" , flex:1}}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        className="top"
      >
        <If condition={!size(notes)}>
          <Then>
            <p className="error">There&apos;s not any note!</p>
          </Then>
          <Else>
            {notes?.map((note, i) => (
              <div className="item" key={i}>
                <p>{note?.title}</p>
                <div className="top">
                  <span>
                    {moment(note?.created)
                      .tz(userInfo?.timeZone || "UTC")
                      .format("ddd, MMM DD, YYYY h:mma")}{" "}
                    <span
                      style={{
                        color: "#777777",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {note?.byAdmin?.fullName}
                    </span>
                  </span>

                  <IoMdTrash
                    onClick={(e) => deleteNote(e, note)}
                    size={20}
                    style={{ color: "#EA3815", cursor: "pointer" }}
                  />

                  {/* <button onClick={(e) => deleteNote(e, note)}>
                  </button> */}
                </div>
              </div>
            ))}
          </Else>
        </If>
      </div>
      <form className="bottom">
        <textarea
          placeholder="Enter Note..."
          onChange={(e) => setNoteText(e.target.value)}
          maxLength={1000}
          value={noteText}
        ></textarea>
        <button
          type="submit"
          disabled={loading || noteText.length < 1}
          onClick={(e) => sendNote(e)}
        >
          {/* <span className="icon">
            <FaPlus />
          </span> */}
          <span className="text">Add Note</span>
        </button>
      </form>
    </NotesTabStyled>
  );
};

export default NotesTab;
