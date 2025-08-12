import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findIndex } from "lodash-es";
import { If, Then, Else, When } from "react-if";

import { getAllTagsList, addTagToUserInbox, removeTagToUserInbox } from "@/store/actions";

import { TagMenuStyled } from "./styles";
import { RiIndeterminateCircleFill } from "react-icons/ri";

const TagAdd = ({ setTagMenuAnchor, userInboxItem }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const { results: tags, loading } = useSelector((s) => s.tagReducer);
  // const { data: userInboxItem } = useSelector((s) => s.inboxUserMessageReducer);

  const addTagToInbox = (tag) => {
    // setTagMenuAnchor(null);
    dispatch(
      addTagToUserInbox(userInboxItem?._id, {
        tagId: tag._id,
      })
    );
  };

    const removeTagButtonClicked = (tag) => {
      dispatch(
        removeTagToUserInbox(userInboxItem?._id, {
          tagId: tag._id,
        })
      );
    };
  

  useEffect(() => {
    dispatch(
      getAllTagsList({
        inbox: true,
        limit: 100,
        search: searchText,
      })
    );
  }, [searchText]);

  return (
    <TagMenuStyled>
      <div className="body4Medium textPrimeryColor">Add New Tag</div>
      <If condition={loading}>
        {/* <Then>
          <div>Loading</div>
        </Then> */}
        <Else>
          {tags?.map((tag) => (
            <When
              key={tag._id}
              // condition={
              //   findIndex(userInboxItem?.tags, { _id: tag._id }) === -1
              // }
              condition={
                tag
              }
            >
              <button style={{ backgroundColor: findIndex(userInboxItem?.tags, { _id: tag._id }) != -1 && "rgba(25, 118, 210, 0.08)" }} className="item" onClick={() => {
                if (findIndex(userInboxItem?.tags, { _id: tag._id }) != -1) {
                  removeTagButtonClicked(tag)
                } else {
                  addTagToInbox(tag)

                }
              }}>
                <span
                  className="dot tag-dot"
                  style={{ "--color": tag.color }}
                ></span>
                <span style={{ display: "flex", justifyContent: "space-between", flex: 1, }}className="body4Regular textSecondaryColor"><span style={{flex:1 , overflow:"hidden" , whiteSpace: "nowrap" , textOverflow: "ellipsis"}}>{tag.name}</span>{findIndex(userInboxItem?.tags, { _id: tag._id }) != -1 && <RiIndeterminateCircleFill style={{ color: "#b9b9b9", fontSize: "20px" }} />}</span>
              </button>
            </When>
          ))}
        </Else>
      </If>
    </TagMenuStyled>
  );
};

export default TagAdd;
