import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateFollowUpStyled,
  SelectInitailCampaignModalStyled,
} from "./styles";
import {
  FaArrowLeft,
  FaBullhorn,
  FaInfoCircle,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { CircularProgress, buttonBaseClasses, styled } from "@mui/material";
import Components from "@/components";
import Assets from "@/assets";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFollowUpCampaign,
  editSingleFollowUpCampaign,
  getAllCompaigns,
  getAllMarkets,
  getFollowUpCompaign,
  getSingleFollowUpCampaign,
} from "@/store/actions";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { followUpCampaignSchema } from "@/schema";
import { useGlobalContext } from "@/hooks";
import Select, { components } from 'react-select';
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";




const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 25rem;
  }
`;

const CreateFollowUp = () => {
  const navigate = useNavigate();
  const [isSelectInitailCampaignModal, setIsSelectInitailCampaignModal] =
    useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { markets, campaignData } = useSelector((s) => s.campaignReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoaderShowing } = useGlobalContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("editId");
  const [selectedMonths, setSelectedMonths] = useState([]);

  const handleSpanClick = (month) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(
        selectedMonths.filter((selectedMonth) => selectedMonth !== month)
      );
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      campaign: "",
      market: "",
      title: "",
    },
    validationSchema: followUpCampaignSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        compaign: values.campaign,
        followMarket: values.market,
        months: selectedMonths,
        permission: selectedCampaign?.permission,
      };
      delete body.campaign;
      delete body.market;

      if (editId)
        dispatch(
          editSingleFollowUpCampaign(
            {
              body,
              _id: editId,
            },
            () => {
              toast.success("Updated successfully!");
              navigate("/campaigns");
            }
          )
        );
      else
        dispatch(
          createFollowUpCampaign({ body }, () => {
            toast.success("Created successfully!");
            navigate("/campaigns");
          },(e)=> toast.error( e?.response?.data?.message)
          )
        );
    },
  });

  useLayoutEffect(() => {
    dispatch(
      getAllMarkets(
        null,
        () => {
          setIsLoading(false);
        },
        () => {
          toast.error("Something went wrong in loading markets!");
          setIsLoading(false);
        }
      )
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    if (editId) {
      dispatch(
        getSingleFollowUpCampaign({ _id: editId }, (campaign) => {
          // dispatch(
          //   getAllCompaigns({}, (data) => {
          //     setSelectedCampaign(
          //       data.results.find(
          //         (singleCampaign) => singleCampaign?._id === campaign.compaign
          //       ) ?? null
          //     );
          //   })
          // );

          setSelectedCampaign(campaign?.compaign);
          setFieldValue(
            "market",
            campaign?.followMarket?._id ??
            campaign?.market?._id ??
            campaign?.market ??
            campaign?.followMarket
          );
          setFieldValue("title", campaign.title ?? campaign.name ?? "");
          console.log(campaign);
        })
      );
    }
  }, [dispatch, editId, setFieldValue]);

  useEffect(() => {
    if (!isSelectInitailCampaignModal) setIsLoaderShowing(campaignData.loading);
  }, [campaignData.loading, setIsLoaderShowing, isSelectInitailCampaignModal]);

  console.log("selectedCompagin is", selectedCampaign);
  useEffect(() => {
    if (selectedCampaign) {
      setFieldValue("campaign", selectedCampaign?._id);
      setFieldValue(
        "market",
        selectedCampaign?.market?._id ??
        selectedCampaign?.followMarket?._id ??
        selectedCampaign?.market ??
        selectedCampaign?.followMarket ??
        ""
      );
      
    } else {
      setFieldValue("campaign", "");
    }
  }, [selectedCampaign, setFieldValue]);
  console.log("selected ", selectedCampaign);
  useEffect(() => {
    const campaign = campaignData?.results?.find(
      (campaign) => campaign._id === formik.values.campaign
    );
    if (campaign) setFieldValue("title", campaign.title ? `${campaign.title} - Follow-up` :campaign.name ? `${campaign.name} - Follow-up` : "");
  }, [formik.values.campaign, campaignData?.results, setFieldValue]);



  const Templateoptions = markets?.map((data) => ({
    value: data?._id,
    label: `${data?.name} - ${data?.areaCode}`,
  }));


  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaAngleDown style={{ color: '#777777' }} />
      </components.DropdownIndicator>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(selectedCampaign, 'selellel')

  return (
    <CreateFollowUpStyled icon={Assets.Images.SortDefault}>
      <div className="top body1Medium textPrimeryColor ">
        <h1 className="body1Medium textPrimeryColor">{editId ? "Edit" : "Create"} Follow Up Campaign</h1>
    
      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <div className="top">
          <label className="item">
            <span className="left">
              <span className="text body4Medium textPrimeryColor">Campaign</span>
            </span>
            <div className="right">
              <button
                type="button"
                onClick={() => setIsSelectInitailCampaignModal(true)}
              >
                <span className="icon">
                  <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7264 6.57035V11.264M5.34418 11.3756V15.381M8.67278 12.565L9.58577 13.3175C11.8061 15.1474 12.9162 16.0624 13.8471 15.7911C14.0318 15.7372 14.207 15.6546 14.366 15.5463C15.1674 15.0005 15.1674 13.5619 15.1674 10.6847V6.8174C15.1674 3.94017 15.1674 2.50155 14.366 1.9558C14.207 1.84747 14.0318 1.76486 13.8471 1.71101C12.9162 1.43971 11.8061 2.35467 9.58577 4.18461L8.67278 4.93707C8.49502 5.08358 8.40614 5.15683 8.31627 5.2238C7.58631 5.76775 6.7109 6.08201 5.80165 6.12651C5.6897 6.13198 5.57452 6.13198 5.34418 6.13198C5.1026 6.13198 3.42639 6.13198 3.32478 6.14336C2.47369 6.23859 1.80192 6.91036 1.70668 7.76145C1.69531 7.86307 1.69531 7.98386 1.69531 8.22543V9.27664C1.69531 9.51821 1.69531 9.639 1.70668 9.74062C1.80192 10.5917 2.47369 11.2635 3.32478 11.3587C3.42639 11.3701 5.1026 11.3701 5.34418 11.3701C5.57452 11.3701 5.6897 11.3701 5.80165 11.3756C6.7109 11.4201 7.58631 11.7343 8.31627 12.2783C8.40614 12.3452 8.49502 12.4185 8.67278 12.565Z" stroke="#012635" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M17.9287 4.93442L20.137 2.70312" stroke="#012635" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M18.6572 8.63281H21.5864" stroke="#012635" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M17.9287 12.5656L20.137 14.7969" stroke="#012635" stroke-width="1.5" stroke-linecap="round" />
                  </svg>

                </span>
                <span className="text body4Medium textPrimeryColor">
                  {selectedCampaign?.permission === "compaign"
                    ? selectedCampaign?.name
                    : selectedCampaign?.permission === "followCompaign"
                      ? selectedCampaign?.title
                      : "Select Campaign"}
                </span>
              </button>
            </div>
          </label>
          <label className="item">
            <span className="left">
              <span className="text body4Medium textPrimeryColor">Markets</span>
            </span>
            <div className="right">
              {selectedCampaign !== null ?
                <input
                  value={`${selectedCampaign?.market?.name} - ${selectedCampaign?.market?.areaCode}`}
                  disabled={true}
                />
                :
                <Select
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  onChange={(e) => setFieldValue("market", e.value)}
                  options={Templateoptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  defaultValue={formik.values.market}
                  placeholder={"select..."}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#F7F8FC',
                      primary: '#00BD82',
                    },
                  })}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "100%",
                      height: '48px',
                    }),
                  }}
                  IndicatorsContainer={false}
                />
              }
              {formik.touched.market && formik.errors.market && (
                <p>{formik.errors.market}</p>
              )}
            </div>
            <span className="left">
              <span className="text body4Medium textPrimeryColor">Select Month Without Response</span>
              <LightTooltip
                arrow
                placement="right"
                title={
                  <>
                    <p>Select a month with no responses</p>
                    <p>from the initial Campaign that</p>
                    <p>you want to follow up with</p>
                  </>
                }
              >
                <pan className="icon">
                  <AiOutlineInfoCircle size={'1.8rem'} />
                </pan>
              </LightTooltip>
            </span>
          </label>
          <label className="item">
            <div className="right">
              {selectedCampaign ? (
                <div>
                  {selectedCampaign?.monthsData?.map(
                    (data, i) =>
                      i !== selectedCampaign?.monthsData?.length - 1 && (
                        <span
                          disabled={true}
                          onClick={() =>
                            data?.monthwise_count > 0 &&
                            handleSpanClick(data.month)
                          }
                          className={
                            selectedMonths.includes(data.month) &&
                              data?.monthwise_count > 0
                              ? "selected"
                              : data?.monthwise_count > 0
                                ? "selected2"
                                : "selected3"
                          }
                        >
                          {new Date(
                            Date.UTC(2000, data?.month - 1, 1)
                          ).toLocaleString("default", { month: "long" })}{" "}
                          ({data?.monthwise_count ?? 0})
                        </span>
                      )
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </label>
          <label className="item">
            <span className="left">
              <span className="text body4Medium textPrimeryColor">Follow up Campaign Title</span>
              <LightTooltip
                arrow
                placement="right"
                title={
                  <>
                    <p>Automatically created based on</p>
                    <p>your initial Campaign (editable)</p>
                  </>
                }
              >
                <pan className="icon">
                  <AiOutlineInfoCircle size={'1.8rem'} />
                </pan>
              </LightTooltip>
            </span>
            <div className="right">
              <input
                type="text"
                placeholder="Enter your follow up campaign title"
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <p>{formik.errors.title}</p>
              )}
            </div>
          </label>
  
        </div>
      </form>


      <div className="Last">
        <button className="back body4Medium textSecondaryColor" type="button" onClick={() => navigate('/campaigns')}>
          Cancel
        </button>
        <button
          className="Send primeryBackground"
          type="submit"
          disabled={
            !formik.isValid || !formik.dirty || selectedMonths?.length <= 0
          }
          onClick={() => { formik?.handleSubmit() }}
        >
          <span className="text body4Medium textWhiteColor ">
            {editId ? "Update" : "Save"} Follow Up Campaign
          </span>
        </button>
      </div>
      <Components.Common.ModalTop
        onClose={() => { }}
        open={isSelectInitailCampaignModal}
      >
        <SelectInitailCampaignModal
          onClose={(campaign) => {
            setFieldValue("market", campaign?.market?._id)
            setIsSelectInitailCampaignModal(false);
            setSelectedCampaign(campaign);
          }}
        />
      </Components.Common.ModalTop>
    </CreateFollowUpStyled>
  );
};
export default CreateFollowUp;


















const SelectInitailCampaignModal = ({ onClose }) => {
  const { results: allCampaigns, loading } = useSelector(
    (s) => s.campaignReducer.campaignData
  );
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filtered, setfiltered] = useState([]);

  useLayoutEffect(() => {
    dispatch(getFollowUpCompaign());
  }, [dispatch]);

  useEffect(() => {
    setfiltered(
      allCampaigns.filter((campaign) =>
        campaign?.permission === "compaign"
          ? campaign?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
          : campaign?.title?.toLowerCase()?.includes(searchText?.toLowerCase())
      )
    );
  }, [allCampaigns, searchText]);

  return (
    <SelectInitailCampaignModalStyled>
      <div className="top">
        <h2>Select A Campaign</h2>
        <button onClick={() => onClose(null)}>
          <IoCloseSharp size={'2rem'} />
        </button>
      </div>
      <div className="bottom">
        <div className="top">
          <input
            type="text"
            placeholder="Search Campaigns"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <p>
            Picking out the campaigns where the people we contacted haven't
            answered for at least a week
          </p>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Prospects Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="loading" colSpan={3}>
                    <div>
                      <CircularProgress />
                    </div>
                    <div>LOADING</div>
                  </td>
                </tr>
              ) : (
                <>
                  {filtered.length === 0 ? (
                    <tr>
                      <td className="error" colSpan={3}>
                        No record found!
                      </td>
                    </tr>
                  ) : null}
                  {filtered.map((singleCampaign, i) => (
                    <tr key={i}>
                      <td>{singleCampaign?.name && singleCampaign.name}</td>
                      <td>
                        {singleCampaign?.monthsData &&
                          singleCampaign.monthsData[
                            singleCampaign.monthsData.length - 1
                          ]?.monthwise_count}
                      </td>
                      <td>
                        <button onClick={() => onClose(singleCampaign)}>
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SelectInitailCampaignModalStyled>
  );
};
