
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SelectedInboxItemContext,
  SelectedTabContext,
} from "./SelectedInboxItemContext";
import {
    InboxMainStyled,
 
  } from "./styles";
  import styles from "./Inbox.module.css";
import Inbox from "./InboxS";
import RightSide from "./RughtSide";
import SetRemainderModal from "./SetRemainderModal";
import Components from "@/components";
const InboxMainStyledMotioned = motion(InboxMainStyled);

const InboxMain = () => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedUserInbox, setSelectedUserInbox] = useState(null);
  const [selectedRemainderId, setSelectedRemainderId] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  useEffect(() => {
    if (selectedUserInbox?._id) {
      setSelectedId(selectedUserInbox._id);
    }
  }, [selectedUserInbox]);

  return (
    <SelectedInboxItemContext.Provider
      value={{
        selectedUserInbox,
        setSelectedUserInbox,
      }}
    >
      <SelectedTabContext.Provider
        value={{
          selectedTabIndex,
          setSelectedTabIndex,
          selectedRemainderId,
          setSelectedRemainderId,
        }}
      >
        <InboxMainStyledMotioned
          open={Boolean(selectedId)}
          transition={{
            type: selectedId ? "spring" : "just",
            duration: selectedId ? 2 : 0.5,
            bounce: 0.5,
          }}
        >
          <div id={selectedId && "inboxMainStyleLayout"}>
            <Inbox
              selectedId={selectedId}
              setSelectedRemainderId={setSelectedRemainderId}
            />
            <AnimatePresence>
              {Boolean(selectedId) && (
                <motion.div
                  // className="right"
                  className={styles.rightStyled}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ width: 0, scaleX: 0, opacity: 0 }}
                >
                  <RightSide setSelectId={() => setSelectedId("")} />
                </motion.div>
              )}
            </AnimatePresence>

            <Components.Common.ModalTop
              open={selectedRemainderId}
              onClose={() => { }}
            >
              <SetRemainderModal
                onClose={() => setSelectedRemainderId("")}
                selectedUserInbox={selectedUserInbox}
              />
            </Components.Common.ModalTop>
          </div>
        </InboxMainStyledMotioned>
      </SelectedTabContext.Provider>
    </SelectedInboxItemContext.Provider>
  );
};


export default InboxMain