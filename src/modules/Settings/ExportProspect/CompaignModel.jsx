import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { CompaignModelStyle } from "./style";
import { IoSearch } from "react-icons/io5";

const CompaignModel = (props) => {
  const [value, setValue] = useState("");
  // Search Value Handler
  const onChange = (event) => {
    setValue(event.target.value);
  };
  // Toggle the active element
  const toggleActive = (id) => {
    props.setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        active: item._id === id && true, // Set active to true only for the clicked item
      }))
    );
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedDate;
  };

  return (
    <CompaignModelStyle>
      <div>
        <h1>Filter By Campaign</h1>
        <button onClick={props.cancelButtonHandler}>Cancel</button>
      </div>

      <div>
        <p> Total : </p>
        <div>
          <input
            type="text"
            placeholder="Search for compaign by title"
            onChange={onChange}
            value={value}
          />
          <IoSearch />
        </div>
      </div>

      <div>
        <div>
          <div>
            <p>Created</p>
            <div>
              <p>Name</p>
              <p>Select Campaign</p>
            </div>
          </div>
        </div>
        <div>
          {props.data
            .filter((item) => {
              const searchItem = value.toLowerCase();
              const name = item.name.toLowerCase();
              return name.startsWith(searchItem) && name !== searchItem;
            })
            .map((item) => {
              return (
                <div key={item._id}>
                  <p>{item?.createdAt && formatDate(item.createdAt)}</p>
                  <div>
                    <p>{item?.name && item.name}</p>

                    <div>
                      {item.active ? (
                        <div style={{ backgroundColor: "#f4516c" }}>
                          <RxCross2 />
                        </div>
                      ) : (
                        <div
                          style={{ backgroundColor: "#5867dd" }}
                          onClick={() => {
                            props.selectCompaignName(item.name);
                            toggleActive(item._id);
                            props.cancelButtonHandler();
                            props.selectedCompaignID(item._id);
                          }}
                        >
                          <IoArrowForward />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </CompaignModelStyle>
  );
};

export default CompaignModel;
