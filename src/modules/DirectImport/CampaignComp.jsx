import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./DirectImport.module.css";
import { getAllCompaigns, directImportAssignCampaign } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { CircularLoader } from "@/components/common";

const CampaignComp = ({ singleDirectImport, handleClose , numberOfRowsShowing , currentPage }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filtered, setfiltered] = useState([]);
  const { results: allCampaigns, loading } = useSelector(
    (s) => s.campaignReducer.campaignData
  );

  useLayoutEffect(() => {
    dispatch(getAllCompaigns({ directImport: "directImport" }));
  }, [dispatch]);

  useEffect(() => {
    setfiltered(
      allCampaigns?.filter((campaign) =>
        campaign?.name?.toLowerCase().includes(searchText?.toLowerCase())
      )
    );
  }, [allCampaigns, searchText]);

  return (
    <div style={{display:"flex" , flexDirection:"column"}}>
      <div style={{ padding: "20px 20px" ,  borderBottom:"solid 1px #F0F0F0" , marginBottom:"20px" ,  }}>
        <div
          style={{
            width: "100%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            border: "solid 1px #D3D7DD",
            borderRadius: "8px",
            padding: "0px 10px",
          }}
        >
          <input
            placeholder="Search Campaign"
            className={styles.custom_input}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </div>
      <div >
        <div
          style={{
            color: "#777777",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: 500,
            padding: "0px 18px",
            paddingBottom:"15px"
          
          }}
        >
          Filtering campaign with prospects available from 01/09/2023 -
          07/05/2024
        </div>
        <div style={{ display: "flex", padding: "0px 20px" }}>
          <div
            style={{
              width: "233px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              color: "#012635",
              fontWeight: 500,
            }}
          >
            Name
          </div>
          <div
            style={{
              width: "153px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              color: "#012635",
              fontWeight: 500,
            }}
          >
            Total Prospects
          </div>
          <div
            style={{
              height: "48px",
              display: "flex",
              alignItems: "center",
              color: "#012635",
              fontWeight: 500,
            }}
          >
            Available
          </div>
        </div>
      </div>
      <div
        className={styles.custom_scrollbar}
        style={{ minHeight:"50vh" , flexGrow:1, overflow: "auto", padding:"0px 15px" }}
      >
        {loading ? (
          <>
            <center>
              {/* <CircularProgress /> */}
              <CircularLoader/>
            </center>
            <center>LOADING</center>
          </>
        ) : (
          <>
            {filtered?.length === 0 ? <p>No record found!</p> : null}
            {filtered?.map((data, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    padding: "5px 5px",
                    borderTop: "solid 1px #F0F0F0",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      width: "233px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      color: "#777777",
                      fontWeight: 500,
                    }}
                  >
                    {data?.name && data.name}
                  </div>
                  <div
                    style={{
                      width: "153px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      color: "#777777",
                      fontWeight: 500,
                    }}
                  >
                    {data?.totalProspects && data.totalProspects}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexGrow: 1,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        color: "#777777",
                        fontWeight: 500,
                      }}
                    >
                      {data?.remaning && data.remaning}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        cursor: "pointer",
                        width: "100px",
                        textAlign: "center",
                        backgroundColor: "#00BD82",
                        height: "40px",
                      }}
                      onClick={() => {
                        dispatch(
                          directImportAssignCampaign({
                            _id: singleDirectImport?._id,
                            body: { campaign: data?._id },
                            limit: numberOfRowsShowing,
                            page: currentPage,
                            search: "",
                          })
                        );
                        handleClose();
                      }}
                    >
                      Select
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignComp;
