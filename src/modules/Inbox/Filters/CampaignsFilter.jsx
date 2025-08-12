import { useState, useEffect, useRef } from "react";
import { BsDash } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { isEmpty } from "lodash-es";

import { getAllCompaignsForInbox } from "@/store/actions";

import { CampaignsButtonDropdownStyled, MyLightTooltip } from "../styles";

const CampaignsFilter = ({ selectCampaign, isOpen, toggleDropdown }) => {
  const [searchText, setSearchText] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { results: campaignData } = useSelector(
    (s) => s.campaignReducer.campaignData
  );

  // useEffect(() => {
  //   const getData = setTimeout(() => {
  //     dispatch(
  //       getAllCompaignsForInbox({
  //         // limit: 10,
  //         search: searchText,
  //       })
  //     );
  //   }, 500);
  //   return () => clearTimeout(getData);
  // }, [searchText]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const getTitle = (campaign) => {
    return campaign.name || campaign.title;
  };

  const toggleDropdownInside = (event) => {
    // setIsOpen(!isOpen);
    toggleDropdown();
    event.stopPropagation();
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // setIsOpen(false);
      toggleDropdown();
    }
  };

  const selectCampaignClicked = (e, campaign) => {

    e.stopPropagation();
    setSelectedCampaign(campaign);
    selectCampaign(campaign);
    toggleDropdown();
  };

  return (
    <MyLightTooltip
      placement="bottom"
      open={isOpen}
      title={
        <CampaignsButtonDropdownStyled ref={dropdownRef}>
          <div className="top">
            <input
              type="text"
              placeholder="Search Campaign"
              value={searchText}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="bottom">
            {campaignData?.map((campaign, i) => (
              <button
                key={i}
                className={classNames({
                  selected: campaign._id === selectedCampaign?._id,
                })}
                onClick={(e) => selectCampaignClicked(e, campaign)}
              >
                <span className="text">{getTitle(campaign)}</span>
                <span
                  className="dash"
                  onClick={(e) => selectCampaignClicked(e, null)}
                >
                  <BsDash />
                </span>
              </button>
            ))}
          </div>
        </CampaignsButtonDropdownStyled>
      }
    >
      <div
        className={classNames({
          selected: !isEmpty(selectedCampaign),
        })}
        onClick={toggleDropdownInside}
      >
        <span className="text">
          {selectedCampaign ? getTitle(selectedCampaign) : "Campaigns"}
        </span>

        <span className="icon">
          <FaChevronDown />
        </span>
      </div>
    </MyLightTooltip>
  );
};

export default CampaignsFilter;
