import React, { useState } from "react";
import { ArrowIcon, MultiSelectorDropDownStyle, TagsItemStyle, TagsStyle, Title } from "./style";

import { FaTag } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const MultiSelectorDropDown = (props) => {
  const [filterValue, setFilterValue] = useState("");

  const handleAdd = (el) => {
    props.setSelectedData([el, ...props.selectedData]);
    const updatedSelectorData = props.data.filter(
      (item) => item._id !== el._id
    );
    props.setData(updatedSelectorData);
  };

  const handleRemove = (el) => {
    props.setSelectedData(
      props.selectedData.filter((item) => item._id !== el._id)
    );
    props.setData([...props.data, el]);
  };

  return (
    <>
      <MultiSelectorDropDownStyle>
        <Title>Tags</Title>
        <div onClick={() => props.setActive(true)}>
          {props.selectedData && (
            <header>
              {props.selectedData.map((el) => (
                <Tags
                  text={el.name}
                  key={el._id}
                  onRemove={() => handleRemove(el)}
                />
              ))}
            </header>
          )}
          <div>
             <input
            type="text"
            placeholder="Write here ..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
           <ArrowIcon /></div>
         
        </div>
        {props.active && props.data.length > 0 && (
          <section>
            {props.data
              .filter((el) =>
                el.name.toLowerCase().includes(filterValue.toLowerCase())
              )
              .map((el) => (
                <TagsItem
                  key={el._id}
                  text={el.name}
                  onAdd={() => handleAdd(el)}
                />
              ))}
          </section>
        )}
      </MultiSelectorDropDownStyle>
    </>
  );
};
export default MultiSelectorDropDown;

const TagsItem = (props) => {
  return (
    <TagsItemStyle onClick={props.onAdd}>
      <h6>{props.text}</h6>
    </TagsItemStyle>
  );
};

const Tags = (props) => {
  return (
    <TagsStyle>
      <section>
        <FaTag />
        <p>{props.text}</p>
        <ImCancelCircle onClick={props.onRemove} />
      </section>
    </TagsStyle>
  );
};
