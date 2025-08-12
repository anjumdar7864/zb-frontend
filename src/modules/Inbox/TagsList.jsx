import { FaTag, FaTimes } from "react-icons/fa";
import { If, Then, Else } from "react-if";
import { size } from "lodash-es";
import { useDispatch, useSelector } from "react-redux";

import { removeTagToUserInbox } from "@/store/actions";
import { TbTag } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

const TagsList = () => {
  const dispatch = useDispatch();
  const { data: userInboxItem } = useSelector((s) => s.inboxUserMessageReducer);
  const removeTagButtonClicked = (tag) => {
    dispatch(
      removeTagToUserInbox(userInboxItem?._id, {
        tagId: tag._id,
      })
    );
  };

  return (
    <section style={{display:"flex" , justifyContent:"space-between"}}>
      <h2 style={{ borderBottom: "none", padding: "0rem" }}>
        <span className="icon">
          {/* <FaTag /> */}
          <TbTag />
        </span>
        <span className="text">Tags</span>
      </h2>
      <div>
        <If condition={!size(userInboxItem?.tags)}>
          <Then>
            <p>There&apos;s not any tag!</p>
          </Then>
          <Else>
            {userInboxItem?.tags?.map((tag, i) => (
              <section >
                <div className="item" style={{ "--color": tag.color }}  key={i}>
                  {/* <span className="dot" style={{ "--color": tag.color }} /> */}
                  <span className="text">{tag?.name}</span>
                  <button
                    className="overlay"
                    onClick={() => removeTagButtonClicked(tag)}
                  >
                  <AiOutlineClose />

                  </button>
                </div>
              </section>
            ))}
          </Else>
        </If>
      </div>
    </section>
  );
};

export default TagsList;
