import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { size } from "lodash-es";
import toast from "react-hot-toast";
import { When } from "react-if";

import {
  getAllRepliesTemplates,
  getAllRepliesTemplatesQuickReply,
  getAllReplyTemplateCategories,
} from "@/store/actions";
import { useGlobalContext } from "@/hooks";
import { resolveTemplate } from "@/utils";
import Assets from "@/assets";
import { getUserAuth } from "@/utils/storage";

import { QuickRepliesModalStyled } from "../styles";
import { MdClose } from "react-icons/md";
// import { SelectedInboxItemContext } from "../SelectedInboxItemContext";

const QuickRepliesModal = ({
  setSendMessageText,
  onClose,
  setSendMessageCategory,
}) => {
  const navigate = useNavigate();
  const [savedCategory, setSavedCategory] = useState("");
  const { setIsLoaderShowing } = useGlobalContext();
  // const item = useContext(SelectedInboxItemContext);
  const dispatch = useDispatch();
  const {
    loading,
    replyTemplateCategories,
    quickReplytemplatesData: templatesData,
  } = useSelector((s) => s.templateReducer);
  const { inboxDetail } = useSelector((s) => s.inboxUserMessageReducer);


// console.log("check if running === ", inboxDetail);

console.log("inboxDetail === ", inboxDetail);

  let user = getUserAuth();
  let userPermission = [];
  if (user) {
    let newUser = JSON.parse(user?.user);
    userPermission = newUser?.role?.permissions;
  }

  let sendMessageCategory = localStorage.getItem("sendMessageCategry");

  console.log("sendMessageCategory === ", sendMessageCategory);
  if (sendMessageCategory) {
    sendMessageCategory = replyTemplateCategories.find(
      (item) => item?._id.toString() === sendMessageCategory.toString()
    );
  }

  useEffect(() => {
    if (sendMessageCategory) {
      dispatch(
        getAllRepliesTemplatesQuickReply({
          limit: 999,
          searchByCategory: sendMessageCategory?._id,
        })
      );
    } else {
      dispatch(getAllRepliesTemplatesQuickReply({ limit: 9999 }));
    }
  }, []);

  // useEffect(() => {
  //   dispatch(getAllReplyTemplateCategories({ limit: 100 }));
  // }, []);
  useEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  const templatedSelectClicked = (template) => {
    const resolvedTemplate = resolveTemplate(template.reply, inboxDetail);
    const paramsPattern = /[^{}]+(?=})/g;
    let remainResolveAttributes = resolvedTemplate.match(paramsPattern);
    if (size(remainResolveAttributes)) {
      toast.error(
        `Prospect has null values in quick reply template ${remainResolveAttributes[0]}`
      );
    } else {
      setSendMessageText(resolvedTemplate);
      setSendMessageCategory(savedCategory);
      console.log("resolvedTemplate === ", resolvedTemplate ,"saved category === ", savedCategory);
    }
    onClose();
  };

  return (
    <QuickRepliesModalStyled ChevronDown={Assets.Images.ChevronDown}>
      <div className="top">
        <h2>Quick Replies</h2>
        <div className="right">
          {user.type === "admin" ? (
            <button
              type="button"
              onClick={() => navigate("/templates/quick-replies")}
            >
              Edit
            </button>
          ) : userPermission?.includes("Templates") ? (
            <button
              type="button"
              onClick={() => navigate("/templates/quick-replies")}
            >
              Edit
            </button>
          ) : (
            ""
          )}
          {/* <button type="button" onClick={onClose}>
            Cancel
          </button> */}
          <MdClose style={{ cursor: "pointer" }} onClick={onClose} size={24} color="#012635" />
        </div>
      </div>
      <div className="bottom">
        <div className="top">
          <select
            onChange={(e) => {
              dispatch(
                getAllRepliesTemplatesQuickReply({
                  limit: 999,
                  searchByCategory: e.target.value,
                })
              );
              setSavedCategory(e.target.value);
            }}
          >
            {sendMessageCategory ? (
              <option value={sendMessageCategory?._id}>
                {sendMessageCategory?.name}
              </option>
            ) : (
              <option value="all">Filter by Category</option>
            )}
            {sendMessageCategory
              ? replyTemplateCategories
                ?.filter((item) => item.name !== sendMessageCategory?.name)
                .map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))
              : replyTemplateCategories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="bottom">
          {templatesData?.results?.map((template, i) => (
            <div
              className="item"
              key={i}
              onClick={(e) => templatedSelectClicked(template)}
            >
              <h6>{template.title}</h6>
              <p>{template.reply}</p>
            </div>
          ))}
        


        </div>
      </div>
    </QuickRepliesModalStyled>
  );
};

export default QuickRepliesModal;
