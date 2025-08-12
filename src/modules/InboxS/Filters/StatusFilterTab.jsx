import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaFire,
  FaSeedling,
  FaThermometerEmpty,
  FaTint,
  FaQuestion,
  FaPhoneSlash,
  FaTimes,
  FaExclamation,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { size, isEmpty } from "lodash-es";
import classNames from "classnames";

import { getAllStatusList } from "@/store/actions";
import color from "@/styles/color";

import { StatusButtonDropdownStyled, MyLightTooltip } from "../styles";

export const statusIcons = {
  Hot: {
    active: 1,
    icon: <FaFire />,
    color: "#e52935",
    message: {
      content: "! Status was changed to Hot Lead",
      color: color.Info,
    },
  },
  Warm: {
    active: 1,
    icon: <FaThermometerEmpty />,
    color: "#ffc12b",
    message: {
      content: "! Status was changed to Warm Lead",
      color: color.Info,
    },
  },
  Nurture: {
    active: 1,
    icon: <FaSeedling />,
    color: "#43cd80",
    message: {
      content: "! Status was changed to Nurture",
      color: color.Info,
    },
  },
  Drip: { active: 1, icon: <FaTint />, color: "#36a3f7" },
  DNC: { active: 0, icon: <FaPhoneSlash />, color: "" },
  "No Status": { active: 1, icon: <FaQuestion />, color: "#dedfe7" },
  "Not Interested": {
    active: 0,
    icon: <FaTimes />,
    color: "#a62921",
    message: {
      content: "! Status was changed to Not Interested",
      color: color.Warning,
    },
  },
  "Wrong Number": { active: 0, icon: <FaExclamation />, color: "#a62921" },
};

const StatusFilterTab = ({
  selectedStatues,
  removeStatus,
  selectStatus,
  isOpen,
  toggleDropdown,
}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { results: statuses } = useSelector((s) => s.statusReducer);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!size(statuses)) {
      dispatch(getAllStatusList());
    }
  }, []);

  useEffect(() => {
    let filters = [];
    for (let status of statuses) {
      if (
        searchParams.get("noStatus") &&
        status.name.replace(" ", "").toLowerCase() == "nostatus"
      ) {
        filters = [status._id];
        break;
      }
      if (statusIcons[status.name]?.active) {
        filters.push(status._id);
      }
    }
    if (size(statuses)) {
      selectStatus(filters);
    }
  }, [statuses]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const toggleDropdownInside = (event) => {
    // setIsOpen(!isOpen);
    toggleDropdown();
    event.stopPropagation();
  };

  const closeDropdown = (event) => {
    // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    // setIsOpen(false);
    toggleDropdown();
    // }
  };
  return (
    <MyLightTooltip
      placement="bottom"
      open={isOpen}
      title={
        <StatusButtonDropdownStyled>
          {statuses.map((status) => (
            <button
              key={status._id}
              className={selectedStatues?.includes(status._id) ? "one" : "two"}
              onClick={() => removeStatus(status._id)}
            >
              <span className="icon">{statusIcons[status.name]?.icon}</span>
              <span className="text">{status.name}</span>
            </button>
          ))}
        </StatusButtonDropdownStyled>
      }
    >
      <div
        className={classNames({
          selected: !isEmpty(selectedStatues),
        })}
        id="statusFilter-color"
        onClick={toggleDropdownInside}
      >
        Status
        <FaChevronDown />
      </div>
    </MyLightTooltip>
  );
};

export default StatusFilterTab;
