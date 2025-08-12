import React, { useEffect, useState } from "react";
import styles from "./SubscriptionManagement.module.css";
import SubscriptionManagementTable from "./SubscriptionManagementTable";
import Components from "@/components";
import SubscriptionManagementModal from "./SubscriptionManagementModal";
import SubscriptionEditModal from "./SubscriptionEditModal";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { logOut, setUserReminder } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubscriptionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    setIsEditModal(true);
    setUserId(id);
  };
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const fetchData = async () => {
    try {
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_SUBSCRIPTION}`
      );
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setSubscriptionData(data?.results);
      //  console.log("check get data" , data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("check get data");
    fetchData();
  }, []);
  return (
    <div className={styles.tabContainerSubscription}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#012635",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          Subscription Plans
        </h1>
        {(user.role === 'superAdmin' || user.permissions.includes('FC_Subscription Management')) && (
        <div className="button" onClick={handleCreateClick}>
          Create Plan
        </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "16px",
          // marginBottom: "20px ",
        }}
        className={styles.tableLayout}
      >
        <SubscriptionManagementTable
          fetchData={fetchData}
          subscriptionData={subscriptionData}
          onClick={handleEditClick}
          user={user}
        />
      </div>
      {/* <div
        className={styles.SubscriptionManagementBottom}
        style={{ display: "grid", gap: "16px" }}
      >
        <div className={styles.tableLayout}>
          <SubscriptionManagementTable fetchData={fetchData} subscriptionData={subscriptionData} onClick={handleEditClick} />
        </div>
      </div> */}
      <Components.Common.ModalTop open={isModalOpen} onClose={() => {}}>
        <SubscriptionManagementModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchData();
          }}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop open={isEditModal} onClose={() => {}}>
        <SubscriptionEditModal
          isOpen={isEditModal}
          onClose={() => {
            setIsEditModal(false);
            fetchData();
          }}
          userId={userId}
        />
      </Components.Common.ModalTop>
    </div>
  );
};

export default SubscriptionManagement;
