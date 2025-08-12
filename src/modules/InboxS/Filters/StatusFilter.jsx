// import { useEffect } from "react";
// import {
//   FaChevronDown,
//   FaFire,
//   FaSeedling,
//   FaThermometerEmpty,
//   FaTint,
//   FaQuestion,
//   FaPhoneSlash,
//   FaTimes,
//   FaExclamation,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { size, isEmpty } from "lodash-es";
// import classNames from "classnames";

// import { getAllStatusList } from "@/store/actions";
// import color from "@/styles/color";

// import { StatusButtonDropdownStyled, MyLightTooltip } from "../styles";

// export const statusIcons = {
//   Hot: {
//     active: 1,
//     icon: <FaFire />,
//     color: "#e52935",
//     message: {
//       content: "! Status was changed to Hot Lead",
//       color: color.Info,
//     },
//   },
//   Warm: {
//     active: 1,
//     icon: <FaThermometerEmpty />,
//     color: "#ffc12b",
//     message: {
//       content: "! Status was changed to Warm Lead",
//       color: color.Info,
//     },
//   },
//   Nurture: {
//     active: 1,
//     icon: <FaSeedling />,
//     color: "#43cd80",
//     message: {
//       content: "! Status was changed to Nurture",
//       color: color.Info,
//     },
//   },
//   Drip: { active: 1, icon: <FaTint />, color: "#36a3f7" },
//   DNC: { active: 0, icon: <FaPhoneSlash />, color: "" },
//   "No Status": { active: 1, icon: <FaQuestion />, color: "#dedfe7" },
//   "Not Interested": {
//     active: 0,
//     icon: <FaTimes />,
//     color: "#a62921",
//     message: {
//       content: "! Status was changed to Not Interested",
//       color: color.Warning,
//     },
//   },
//   "Wrong Number": { active: 0, icon: <FaExclamation />, color: "#a62921" },
// };

// const StatusFilter = ({ selectedStatues, removeStatus, selectStatus }) => {
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();
//   const { results: statuses } = useSelector((s) => s.statusReducer);

//   useEffect(() => {
//     if (!size(statuses)) {
//       dispatch(getAllStatusList());
//     }
//   }, []);

//   useEffect(() => {
//     let filters = [];
//     for (let status of statuses) {
//       if (
//         searchParams.get("noStatus") &&
//         status.name.replace(" ", "").toLowerCase() == "nostatus"
//       ) {
//         filters = [status._id];
//         break;
//       }
//       if (statusIcons[status.name]?.active) {
//         filters.push(status._id);
//       }
//     }
//     if (size(statuses)) {
//       selectStatus(filters);
//     }
//   }, [statuses]);

//   return (
//     <MyLightTooltip
//       placement="bottom"
//       title={
//         <StatusButtonDropdownStyled>
//           {statuses.map((status) => (
//             <button
//               key={status._id}
//               className={selectedStatues?.includes(status._id) ? "one" : "two"}
//               onClick={() => removeStatus(status._id)}
//             >
//               <span className="icon">{statusIcons[status.name]?.icon}</span>
//               <span className="text">{status.name}</span>
//             </button>
//           ))}
//         </StatusButtonDropdownStyled>
//       }
//     >
//       <div
//         className={classNames({
//           selected: !isEmpty(selectedStatues),
//         })}
//         id="statusFilter-color"
//       >
//         Status
//         <FaChevronDown />
//       </div>
//     </MyLightTooltip>
//   );
// };

// export default StatusFilter;



import { useEffect } from "react";
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
  FaRegQuestionCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { size, isEmpty } from "lodash-es";
import classNames from "classnames";

import { getAllStatusList } from "@/store/actions";
import color, { BackgroundColor } from "@/styles/color";

import { StatusButtonDropdownStyled, MyLightTooltip } from "../styles";
import Assets from "@/assets";
import { backIn } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";
import { AiOutlineExclamation } from "react-icons/ai";

export const statusIcons = {
  Hot: {
    active: 1,
    // icon: <FaFire />,
    icon: <img src={Assets.Images.fire} width={18} height={18}/>,
    selectedIcon: <img src={Assets.Images.fireWhite} width={18} height={18}/>,
    color: "#e52935",
    BackgroundColor:"#FFEEEE",
    unselectedIcon: <img src={Assets.Images.fireUnselect} width={18} height={18}/>,
    message: {
      content: "! Status has been changed to Hot Lead.",
      // color: color.Info,
      color: "#e52935",
    },
  },
  Warm: {
    active: 1,
    icon: <img src={Assets.Images.temprature} width={18} height={18}/>,
    selectedIcon: <img src={Assets.Images.tempratureWhite} width={18} height={18}/>,
    color: "#ffc12b",
    BackgroundColor:"#FDF5E0",
    unselectedIcon: <img src={Assets.Images.tempratureUnselected} width={18} height={18}/>,
    message: {
      content: "! Status has been changed to Warm Lead.",
      color: "#ffc12b",
    },
  },
  Nurture: {
    active: 1,
    icon: <img src={Assets.Images.nature} width={18} height={18}/>,
    selectedIcon: <img src={Assets.Images.natureWhite} width={18} height={18}/>,
    color: "#43cd80",
    BackgroundColor:"#E1F3EE",
    unselectedIcon: <img src={Assets.Images.NatureUnselected} width={18} height={18}/>,
    message: {
      content: "! Status has been changed to Nurture.",
      color: "#43cd80",
    },
  },
  Drip: { active: 1, icon: <img style={{width:"16px" , height:"16px"}} src={Assets.Images.sidebar_drop}/>, color: "#36a3f7" ,    BackgroundColor:"#E8F0FB", unselectedIcon: <img src={Assets.Images.dripUnselected} width={18} height={18}/>, selectedIcon: <img src={Assets.Images.dripSelected} width={18} height={18}/>},
  DNC: { active: 0, icon: <FaPhoneSlash size={18} />, color: "" },
  "No Status": { active: 1, icon: <img src={Assets.Images.question} width={18} height={18} />, color: "#F0F0F0" ,    selectedIcon: <FaRegQuestionCircle style={{color:"#012635"}} size={18} />,   BackgroundColor:"#F0F0F0", unselectedIcon: <img src={Assets.Images.question} width={18} height={18}/>, },
  "Not Interested": {
    active: 0,
    icon:  <AiOutlineExclamation size={18} style={{color:"#012635"}}/>,
    color: "#6821a6",
    BackgroundColor:"#EBE9F8",
    unselectedIcon: <img src={Assets.Images.wrongUnselected} width={18} height={18}/>,
    selectedIcon:<FaExclamation size={18} style={{color:"white"}} /> , 
    message: {
      content: "! Status has been changed to Not Interested.",
      color: "#6821a6",
    },
  },
  "Wrong Number": { 
    active: 0,
    icon: <IoMdClose size={18} style={{color:"#012635"}} />, 
    // icon: <img src={Assets.Images.wrongUnselected}/>, 
    color: "#a62921" ,
    BackgroundColor:" #FEE5DF",
    unselectedIcon:  <img src={Assets.Images.UnselectedCross} style={{width:"16px" , height:"16px"}}/>,
    selectedIcon:  <IoMdClose style={{color:"white" }} size={18} />, 
    // unselectedIcon: <FaExclamation />,
  },
};

const StatusFilter = ({ selectedStatues, removeStatus, selectStatus }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { results: statuses } = useSelector((s) => s.statusReducer);

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

  return (
    <MyLightTooltip
      placement="bottom"
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
      >
        Status
        <FaChevronDown />
      </div>
    </MyLightTooltip>
  );
};

export default StatusFilter;
