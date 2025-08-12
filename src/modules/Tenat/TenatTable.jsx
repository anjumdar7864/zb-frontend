import React, { useEffect, useRef, useState } from "react";
import {
  ActionButton,
  ActionDropdown,
  DropdownItem,
  StyledStatus,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./styles";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LightTooltip } from "@/components/common";
import { LoginAsUser, ActiveTenant, DeActiveTenant,LoginAsUserMaster } from "../../store/actions";

export const TenatTable = ({ tenets, setCurrentCompnent, setTenantData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    activeLoading,
    deActiveLoading,
  } = useSelector((state) => state.tenetsReducer);

  // useEffect(() => {
  //   console.log("tenets", tenets);
  // }, [tenets]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const tenants = [
  //     { id: 1, companyName: "Example Corp", name: "John Doe",status:"Active", subscription: "Premium", onboardingDate: "2023-01-01", planExpiryDate: "2024-01-01", paymentStatus: "Pending", lastLogin: "2024-08-01", messageSent: "35 (Messages)" },
  //     { id: 2, companyName: "Tech Solutions", name: "Jane Smith",status:"Active", subscription: "Basic", onboardingDate: "2023-02-01", planExpiryDate: "2024-02-01", paymentStatus: "Up-to-date", lastLogin: "2024-08-10", messageSent: "35 (Messages)" },
  //     { id: 2, companyName: "Tech Solutions", name: "Jane Smith",status:"Suspended", subscription: "Standard", onboardingDate: "2023-02-01", planExpiryDate: "2024-02-01", paymentStatus: "Pending", lastLogin: "2024-08-10", messageSent: "35 (Messages)" },
  //     { id: 2, companyName: "Tech Solutions", name: "Jane Smith",status:"On-Hold", subscription: "Standard", onboardingDate: "2023-02-01", planExpiryDate: "2024-02-01", paymentStatus: "Up-to-date", lastLogin: "2024-08-10", messageSent: "35 (Messages)" },
  //     { id: 2, companyName: "Tech Solutions", name: "Jane Smith",status:"Active", subscription: "Standard", onboardingDate: "2023-02-01", planExpiryDate: "2024-02-01", paymentStatus: "Pending", lastLogin: "2024-08-10", messageSent: "35 (Messages)" },
  //     { id: 2, companyName: "Tech Solutions", name: "Jane Smith",status:"Suspended", subscription: "Standard", onboardingDate: "2023-02-01", planExpiryDate: "2024-02-01", paymentStatus: "Pending", lastLogin: "2024-08-10", messageSent: "35 (Messages)" },

  //   ];

  function convertTimestampToDate(timestamp) {
    // Create a new JavaScript Date object based on the timestamp (in milliseconds)
    const date = new Date(timestamp);

    // Format the date to a readable format (e.g., "YYYY-MM-DD HH:mm:ss")
    const formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);

    return formattedDate;
  }

  function formatLastLogin(lastLogin) {
    if (!lastLogin) {
      return "N/A";
    }

    const date = new Date(lastLogin);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function getExpiryDate(timestamp) {
    const date = new Date(timestamp);

    // Add 30 days to the date
    date.setDate(date.getDate() + 30);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const loginAsUser = (user) => {
    const { email } = user;
    console.log("email",email);
    console.log(user);
    if(user?.role == "superAdmin"){
      console.log("here");
    dispatch(
      LoginAsUser(email, () => {
        navigate("/redirect?redirect=/tenant");
        window.location.reload();
      })
    );
    }else {
      console.log("yes");
      dispatch(
        LoginAsUserMaster(email, () => {
          navigate("/redirect?redirect=/tenant");
          window.location.reload();
        })
      );
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            {[
              "ID",
              "Company Name",
              "Name",
              "Status",
              "Subscription",
              "Onboarding Date",
              "Plan Expiry Date",
              "Payment Status",
              "Last Login",
              "Message Sent",
              "",
            ].map((heading, index) => (
              <TableHeader key={index}>{heading}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody ref={dropdownRef}>
          {tenets.map((tenant, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tenant.companyName}</TableCell>
              <TableCell>{tenant.firstName + " " + tenant.lastName}</TableCell>
              <TableCell>
                <StyledStatus status={tenant.status}>
                  {tenant.status}
                </StyledStatus>
              </TableCell>
              <TableCell>
                <StyledStatus subscription={`Basic`}>
                  {tenant?.subscriptionId?.title}
                </StyledStatus>
              </TableCell>
              <TableCell>{convertTimestampToDate(tenant.createdAt)}</TableCell>
              <TableCell>
                {tenant.isPaymentReceived
                  ? getExpiryDate(tenant.createdAt)
                  : "N/A"}
              </TableCell>
              <TableCell>
                <StyledStatus
                  pstatus={tenant.isPaymentReceived ? "Up-to-date" : "Pending"}
                >
                  {tenant.isPaymentReceived ? "Up-to-date" : "Pending"}
                </StyledStatus>
              </TableCell>
              <TableCell>{formatLastLogin(tenant.lastLogin)}</TableCell>
              <TableCell>
                {tenant.sentOutBoundNumber > 0 ? "Yes" : "No"}{" "}
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => toggleDropdown(index)}>
                  <FiMoreVertical size={20} />
                </ActionButton>
                {activeDropdown === index && (
                  <ActionDropdown right="30%" top="90%">
                    <LightTooltip
                      arrow
                      placement="top"
                      title="Login as a Tenant"
                    >
                      <DropdownItem onClick={() => loginAsUser(tenant)}>
                        <FaUser />
                      </DropdownItem>
                    </LightTooltip>
                    <DropdownItem
                      onClick={() => {
                        setTenantData(tenant);
                        navigate(`/tenant/edit/${tenant._id}`);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        dispatch(ActiveTenant({ status: "Active" }, tenant._id))
                      }
                    >
                      <button disabled={activeLoading}>
                        {activeLoading ? "Activating..." : "Activate"}
                      </button>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        dispatch(
                          DeActiveTenant({ status: "Suspended" }, tenant._id)
                        )
                      }
                    >
                      <button disabled={deActiveLoading}>
                        {deActiveLoading ? "Deactivate..." : "Deactivate"}
                      </button>
                    </DropdownItem>
                  </ActionDropdown>
                )}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
