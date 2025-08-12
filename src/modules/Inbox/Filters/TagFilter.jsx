import React from "react";
import { useState, useEffect } from "react";
import { BsDash } from "react-icons/bs";
import { FaChevronDown, FaMinusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { isEmpty } from "lodash-es";

import { getAllTagsList } from "@/store/actions";
import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  TextField,
} from "@mui/material";

import { TagsButtonDropdownStyled, MyLightTooltip } from "../styles";
const TagFilter = ({ selectTag , filters}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const dispatch = useDispatch();

  const { results: tags } = useSelector((s) => s.tagReducer);

  useEffect(() => {
    dispatch(
      getAllTagsList({
        inbox: true,
        limit: 100,
        search: searchText,
      })
    );
  }, [searchText]);

  const selectTagClicked = (e, tag) => {
    e.stopPropagation();
    setSelectedTag(tag);
    selectTag(tag);
  };

  const filteredTags = tags?.filter((tag) =>
    tag.name.toLowerCase().includes(searchText.toLowerCase())
  );

// const selectedTag = tags?.find(tag => tag._id === "67a3ad1f7cbc52996daab7ea") || null;

useEffect(()=>{
  setSelectedTag(tags?.find(tag => tag._id === filters?.tag ))
},[tags , filters])
  return (
    <div>
      <div
        style={{
          color: "#012635",
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: "4px",
        }}
      >
        Tags
      </div>
      <Box sx={{ width: 387, border: "0px", outline: "none" }}>
        <FormControl fullWidth>
          <Select
            IconComponent={(props) => (
              <FaChevronDown
                style={{ color: "#012635", fontSize: "16px" }}
                {...props}
              />
            )}
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 1px #D3D7DD",
              },
            }}
            value={"67a3ad1f7cbc52996daab7ea"}
            displayEmpty
            renderValue={() => (
              <span style={{ color: "#aaa" }}>
                {selectedTag?.name ? selectedTag?.name : "Select an option"}
              </span>
            )} // Placeholder
          >
            {tags?.map((tag, i) => (
              <MenuItem   value={tag?._id} onClick={(e) => selectTagClicked(e, tag)}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      borderRadius: "12px",
                      backgroundColor: tag?.color,
                      height: "fit-content",
                    }}
                  ></div>{" "}
                  <span
                    style={{
                      color: "#777777",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                    className="text"
                  >
                    {tag.name}
                  </span>
                  <div
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <FaMinusCircle
                      onClick={(e) => selectTagClicked(e, null)}
                      style={{
                        display:
                          selectedTag?.name == tag.name ? "block" : "none",
                        fontSize: "18px",
                        color: "#c9c9c9",
                      }}
                    />
                  </div>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default TagFilter;
