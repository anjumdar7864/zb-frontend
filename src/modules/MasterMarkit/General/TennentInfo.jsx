import React, { useEffect, useState } from "react";
import styles from "../MarkitMaster.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import TennentInfoTable from "./TennentInfoTable";
import PaginationComp from "@/modules/DirectImport/Pagination";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import RegisterationInfo from "../RegistrationInfo";
import { UpdateSingleTenet, UpdateSingleTenetCarrierType } from "@/store/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const TennentInfo = ({
  tenantData,
  tenantId,
  handleRefreshTableInfo,
  infoLimit,
  setInfoLimit,
  setinfoCurrentPage,
  infoCurrentPage,
  user,
  sorting,
  setSorting
}) => {
  const { markets, tenant } = tenantData;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [carrierType, setCarrierType] = useState("");

  useEffect(() => {
    setCarrierType(tenant?.carrierType);
  }, [tenant?.carrierType]);
  const dispatch = useDispatch();
  const activeCount =
    markets && markets?.results.length
      ? markets?.results?.reduce((total, row) => {
        return (
          total +
          (row.phoneNumber?.filter((phone) => phone.active === true).length ||
            0)
        );
      }, 0)
      : 0;
  const deActiveCount =
    markets && markets?.results.length
      ? markets?.results?.reduce((total, row) => {
        return (
          total +
          (row.phoneNumber?.filter((phone) => phone.active === false)
            .length || 0)
        );
      }, 0)
      : 0;

  const handleLimitChange = (event) => {
    setInfoLimit(Number(event.target.value)); // Update limit based on dropdown selection
    // setCurrentPage(1); // Reset page to 1 when changing limit
    setinfoCurrentPage(1);
  };
  const handlePageChange = (event, value) => {
    // setCurrentPage(value);
    setinfoCurrentPage(value);
  };
  const handleRegistrationInfo = (data) => {
    // console.log("data check" , data);

    setOpen(true);
  };




  return (
    <div>
      {tenant?._id ? (
        <div className={styles.TennentInfoTop}>
          <div className={styles.TennentInfoTopHTitle}>
            <div >Tenant Info </div>

            <button style={{ width: "150px", border: "solid 1px #00BD82", backgroundColor: "transparent", borderRadius: "8px" }} onClick={() => setIsDlcModelOpen(true)}>
              <span style={{ color: "#00BD82", fontSize: "16px" }} onClick={handleRegistrationInfo} className="text">10 DLC Form</span>
            </button>
          </div>
          <div className={styles.TennentInfoBody}>
            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                Tenant name
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "26px",
                  color: "#012635",
                }}
              >
                {tenant?.firstName && tenant?.lastName
                  ? `${tenant?.firstName} ${tenant?.lastName}`
                  : tenant?.fullName}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                Company name
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "26px",
                  color: "#012635",
                }}
              >
                {tenant?.companyName}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                Plan
              </div>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    color:
                      tenant?.subscriptionId?.title == "Time to Scale"
                        ? "#005ABB"
                        : tenant?.subscriptionId?.title == "I'm Serious"
                          ? "#06AB78"
                          : tenant?.subscriptionId?.title == "Market Dominator"
                            ? "#012635"
                            : tenant?.subscriptionId?.title == "Jumpstart JV"
                              ? "#B1264D"
                              : "#F49C17",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    backgroundColor:
                      tenant?.subscriptionId?.title == "Time to Scale"
                        ? "#E8F0FB"
                        : tenant?.subscriptionId?.title == "I'm Serious"
                          ? "#E1F3EE"
                          : tenant?.subscriptionId?.title == "Market Dominator"
                            ? "#D6EFF9"
                            : tenant?.subscriptionId?.title == "Jumpstart JV"
                              ? "#FADEE4"
                              : "#FDF5E0",
                    border: `solid 1px ${tenant?.subscriptionId?.title == "Time to Scale"
                      ? "#005ABB"
                      : tenant?.subscriptionId?.title == "I'm Serious"
                        ? "#00BD82"
                        : tenant?.subscriptionId?.title == "Market Dominator"
                          ? "#012635"
                          : tenant?.subscriptionId?.title == "Jumpstart JV"
                            ? "#E85B79"
                            : "#F49C17"
                      }`,
                    borderRadius: "12px",
                    width: "fit-content",
                    padding: "2px 8px",
                  }}
                >
                  {tenant?.subscriptionId?.title}
                </div>
                <div
                  style={{ display: tenant?.extraNumber == 0 ? "none" : "" }}
                >
                  +{tenant?.extraNumber || ""}
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                10DLC Status
              </div>
              <div
                style={{
                  color: tenant?.isTenDlcSubmit === "Accept"
                    ? "#00724E" : tenant?.isTenDlcSubmit === "Reject" ? "#EA3815" : tenant?.isTenDlcSubmit === "N/A" ? "#B45309"
                      : tenant?.isTenDlcSubmit === "N/S" ? "#777777" : "#FFEEEE",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  backgroundColor: tenant?.isTenDlcSubmit === "Accept"
                    ? "#C2FFEC" : tenant?.isTenDlcSubmit === "Reject" ? "#FFF4E5" : tenant?.isTenDlcSubmit === "N/A" ? "#fdf5e0"
                      : tenant?.isTenDlcSubmit === "N/S" ? "#F5F5F5" : "#FFEEEE",
                  border: `solid 1px ${tenant?.isTenDlcSubmit === "Accept"
                    ? "#00724E" : tenant?.isTenDlcSubmit === "Reject" ? "#EA3815" : tenant?.isTenDlcSubmit === "N/A" ? "#B45309"
                      : tenant?.isTenDlcSubmit === "N/S" ? "#777777" : "#FFEEEE"}`,
                  borderRadius: "12px",
                  width: "fit-content",
                  padding: "2px 8px",
                  cursor: "pointer",
                }}
              >
                {/* {tenant?.isTenDlcSubmit == "Active" ? "Activated": tenant?.isTenDlcSubmit == "N/S" ?  "Pending" :"Deactivated"} */}
                {tenant?.isTenDlcSubmit === "Accept" ? "Approved" : tenant?.isTenDlcSubmit === "Reject" ? "Rejected" : tenant?.isTenDlcSubmit === "N/A" ? "Under Review" : tenant?.isTenDlcSubmit === "N/S" ? "Not Submitted" : "Pending"}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                Outbound Status
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <div
                  style={{
                    display: "flex",
                    width: "75px",
                    height: "24px",
                    gap: "4px",
                    border: "solid 1px #5BF1B2",
                    backgroundColor: "#C2FFEC",
                    borderRadius: "12px",
                    alignItems: "center",
                    padding: "0px 4px",
                  }}
                >
                  <IoCheckmarkCircleOutline
                    style={{ color: "#00724E", fontSize: "16px" }}
                  />
                  <span
                    style={{
                      color: "#00724E",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    {activeCount || 0}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "75px",
                    height: "24px",
                    gap: "4px",
                    border: "solid 1px #EA3815",
                    backgroundColor: "#FFEEEE",
                    borderRadius: "12px",
                    alignItems: "center",
                    padding: "0px 4px",
                  }}
                >
                  <IoCloseCircleOutline
                    style={{ color: "#EA3815", fontSize: "16px" }}
                  />
                  <span
                    style={{
                      color: "#EA3815",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    {deActiveCount || 0}
                  </span>
                </div>
              </div>
            </div>



            <div
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "16px",
                width: "233px",
                height: "98px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#012635",
                }}
              >
                Carrier Type
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                <div
                  style={{
                    display: "flex",
                    width: "95px",
                    height: "24px",
                    gap: "4px",
                    border: `solid 1px ${carrierType === "bandwith" ? "#5BF1B2" : "#7d7d7d"}`,
                    backgroundColor: `${carrierType === "bandwith" ? "#C2FFEC" : "#ffffff"}`,
                    borderRadius: "12px",
                    alignItems: "center",
                    padding: "0px 4px",
                    cursor: carrierType === "bandwith" || carrierType === "webex" ? "not-allowed" : "pointer",
                  }}

                  onClick={() => {
                    if (carrierType === "bandwith" || carrierType === "webex") {
                      return;
                    }
                    dispatch(UpdateSingleTenetCarrierType({ carrierType: "bandwith" }, tenantData?.tenant?._id, ()=>toast.success("Carrier Type has been updated")))
                    setCarrierType("bandwith")
                  }}
                >
                  <IoCheckmarkCircleOutline
                    style={{ color: `${carrierType === "bandwith" ? "#00724E" : "#7d7d7d"}`, fontSize: "16px" }}
                  />
                  <span
                    style={{
                      color: `${carrierType === "bandwith" ? "#00724E" : "#7d7d7d"}`,
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    Carieer B
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "95px",
                    height: "24px",
                    gap: "4px",
                    border: `${carrierType === "webex" ? "solid 1px #5BF1B2" : "solid 1px #7d7d7d"}`,
                    backgroundColor: `${carrierType === "webex" ? "#C2FFEC" : "#ffffff"}`,
                    borderRadius: "12px",
                    alignItems: "center",
                    padding: "0px 4px",
                    cursor: carrierType === "bandwith" || carrierType === "webex" ? "not-allowed" : "pointer",
                  }}

                  onClick={() => {
                    if (carrierType === "bandwith" || carrierType === "webex") {
                      return;
                    }
                    dispatch(UpdateSingleTenetCarrierType({ carrierType: "webex" }, tenantData?.tenant?._id , ()=>toast.success("Carrier Type has been updated")))
                    setCarrierType("webex")
                  }}


                >
                  <IoCheckmarkCircleOutline
                    style={{ color: `${carrierType === "webex" ? "#00724E" : "#7d7d7d"}`, fontSize: "16px" }}
                  />
                  <span
                    style={{
                      color: `${carrierType === "webex" ? "#00724E" : "#7d7d7d"}`,
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    Carieer WX
                  </span>
                </div>
              </div>
            </div>



          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.TennentInfoBottom}>
        <div className={`${styles.tableLayoutInfo} `}>
          <TennentInfoTable
            handleRefreshTableInfo={handleRefreshTableInfo}
            markets={markets?.results}
            tenantId={tenant?._id || tenantId}
            user={user}
            tenatData={tenant}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            border: "solid 1px #E0E0E0",
            borderEndEndRadius: "12px",
            borderBottomLeftRadius: "12px",
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
          }}
        >
          <div>Total: {markets?.totalResults}</div>

          <div>
            <PaginationComp
              totalPages={markets?.totalPages || 1}
              currentPage={infoCurrentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
                color: "#333333",
              }}
            >
              Entries
            </div>

            <div>
              <PaginationDropDown
                limit={infoLimit}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        </div>
      </div>
      <RegisterationInfo open={open} setOpen={setOpen} tenantId={tenantId} />
    </div>
  );
};

export default TennentInfo;
