import {
  FaFire,
  FaTimes,
  FaThermometerEmpty,
  FaTint,
  FaQuestion,
  FaSeedling,
  FaPhoneAlt,
  FaTag,
  FaExclamation,
  FaCheck,
  FaMinus,
  FaPhoneSlash,
  FaStickyNote,
  FaRegStickyNote,
  FaPen,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { If, Then, Else } from "react-if";
import { size } from "lodash-es";
import { CgPushChevronUpR } from "react-icons/cg";

import color from "@/styles/color";

import { ActivityTabStyled } from "../styles";
import { LuTag } from "react-icons/lu";

const activityIcons = new Map();
activityIcons.set("addTag", { icon: <LuTag size={15} color="#c0c0c0" /> });
activityIcons.set("removeTag", { icon: <LuTag size={15} color="#34bfa3" /> });
activityIcons.set("addVerifiedNumber", {
  icon: <FaCheck color={color.Success} />,
});
activityIcons.set("removeVerifiedNumber", {
  icon: <FaMinus color="#a62921" />,
});
activityIcons.set("addDncNumber", { icon: null });
activityIcons.set("removeDncNumber", {
  icon: <FaPhoneSlash color="#a62921" />,
});
activityIcons.set("addWrongNumber", {
  icon: <FaExclamation color="#a62921" />,
});
activityIcons.set("removeWrongNumber", {
  icon: <FaExclamation color="#a62921" />,
});
activityIcons.set("addReminder", {
  icon: <FaExclamation color={color.Primary} />,
});
activityIcons.set("updateReminder", {
  icon: <FaExclamation color={color.Primary} />,
});
activityIcons.set("addStatusHot", { icon: <FaFire color="#e52935" /> });
activityIcons.set("updateStatusHot", { icon: <FaFire color="#e52935" /> });
activityIcons.set("addStatusWarm", {
  icon: <FaThermometerEmpty color="#ffc12b" />,
});
activityIcons.set("updateStatusWarm", {
  icon: <FaThermometerEmpty color="#ffc12b" />,
});
activityIcons.set("addStatusNurture", { icon: <FaSeedling color="#43cd80" /> });
activityIcons.set("updateStatusNurture", {
  icon: <FaSeedling color="#43cd80" />,
});
activityIcons.set("addStatusDrip", { icon: <FaTint color="#36a3f7" /> });
activityIcons.set("updateStatusDrip", { icon: <FaTint color="#36a3f7" /> });
activityIcons.set("addStatusNo Status", {
  icon: <FaQuestion color="#dedfe7" />,
});
activityIcons.set("updateStatusNo Status", {
  icon: <FaQuestion color="#dedfe7" />,
});
activityIcons.set("addStatusNot Interested", {
  icon: <FaTimes color="#a62921" />,
});
activityIcons.set("updateStatusNot Interested", {
  icon: <FaTimes color="#a62921" />,
});
activityIcons.set("addStatusWrong Number", {
  icon: <FaExclamation color="#a62921" />,
});
activityIcons.set("updateStatusWrong Number", {
  icon: <FaExclamation color="#a62921" />,
});
activityIcons.set("addNote", {
  icon: <FaStickyNote color="#36a3f7" />,
});
activityIcons.set("removeNote", {
  icon: <FaRegStickyNote color="#f4516c" />,
});
activityIcons.set("updateProspectName", {
  icon: <FaPen color="#36a3f7" />,
});
activityIcons.set("addProspect", {
  icon: <FaPen color="#36a3f7" />,
});
activityIcons.set("addProspect", {
  icon: <FaPen color="#36a3f7" />,
});
activityIcons.set("pushToCrm", {
  icon: <CgPushChevronUpR color="#36a3f7" />,
});

const ActivityTab = () => {
  const { activityList } = useSelector((s) => s.inboxUserMessageReducer);

  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  return (
    <ActivityTabStyled>
      <If condition={!size(activityList)}>
        <Then>
          <p className="error">There&apos;s not any Activity</p>
        </Then>
        <Else>
          <table>
            <tbody
              style={{ gap: "4px", display: "flex", flexDirection: "column" }}
            >
              {activityList?.map((activity, i) => (
                <tr key={i}>
                  <td>
                    {moment(activity.createdAt)
                      .tz(userInfo?.timeZone || "UTC")
                      .format("ddd, MMM DD, YYYY h:mma")}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".7rem",
                    }}
                  >
                    <span className="icon">
                      {activityIcons.get(activity?.type)?.icon}
                    </span>
                    <span
                      className="text"
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#012635",
                      }}
                    >
                      {activity.name}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Else>
      </If>
    </ActivityTabStyled>
  );
};

export default ActivityTab;
