import { useState, useEffect } from "react";
import { BsDash } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { isEmpty } from "lodash-es";

import { getAllTagsList } from "@/store/actions";

import { TagsButtonDropdownStyled, MyLightTooltip } from "../styles";

const TagsFilter = ({ selectTag, isOpen, toggleDropdown }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { results: tags } = useSelector((s) => s.tagReducer);

  // useEffect(() => {
  //   dispatch(
  //     getAllTagsList({
  //       inbox: true,
  //       limit: 100,
  //       search: searchText,
  //     })
  //   );
  // }, [searchText]);

  const selectTagClicked = (e, tag) => {
    e.stopPropagation();
    setSelectedTag(tag);
    selectTag(tag);
    toggleDropdown();
  };

  const toggleDropdownInside = (event) => {
    toggleDropdown();
    event.stopPropagation();
  };

  return (
    <MyLightTooltip
      placement="bottom"
      open={isOpen}
      title={
        <TagsButtonDropdownStyled>
          {tags?.map((tag) => (
            <button
              key={tag._id}
              className={selectedTag?._id === tag._id ? "selected" : ""}
              onClick={(e) => selectTagClicked(e, tag)}
            >
              <span
                className="icon"
                style={{ "--color": tag.color, width: "20px", height: "20px" }}
              ></span>
              <span className="text">{tag.name}</span>
              <span className="dash" onClick={(e) => selectTagClicked(e, null)}>
                <BsDash />
              </span>
            </button>
          ))}
        </TagsButtonDropdownStyled>
      }
    >
      <div
        className={classNames({
          selected: !isEmpty(selectedTag),
        })}
        onClick={toggleDropdownInside}
        id="tagsFilter-color"
      >
        {selectedTag ? selectedTag.name : "Tags"}
        <FaChevronDown />
      </div>
    </MyLightTooltip>
  );
};

export default TagsFilter;
