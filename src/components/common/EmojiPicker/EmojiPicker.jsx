import { useGlobalContext } from "@/hooks";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { LightTooltip } from "@/components/common";
import { BsEmojiSmile } from "react-icons/bs";
// import styles from "./styles";
import styles from "../../../modules/InboxS/InboxS.module.css"
import { StyledMenu } from "./styles";

const EmojiPicker = ({ onClick, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isSmall } = useGlobalContext();
  const handleClick = (data) => {
    onClick(data?.native);
    setAnchorEl(null);
  };
  return (
    <>
      <LightTooltip arrow placement="top" title="Insert Emoji">
      <button
      className={styles.emojoyButton}
        disabled={disabled}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        // className="emoji"
        type="button"
      >
       <BsEmojiSmile size={'20px'}/>

      </button>
      </LightTooltip>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <Picker
          data={data}
          onEmojiSelect={handleClick}
          theme="light"
          emojiSize={16}
          emojiButtonSize={isSmall ? 28 : 36}
          previewPosition={"none"}
          skin={1}
          searchPosition="none"
          navPosition="none"
        />
      </StyledMenu>
    </>
  );
};
export default EmojiPicker;
