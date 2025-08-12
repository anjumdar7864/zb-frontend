import { useEffect } from "react";
import { P } from "@/styles/CommonStyles";
import React, { useState } from "react";
import {
  NavigationButton,
  OverflowWrapper,
  PaginationButton,
  PaginationContainer,
  SubscriptionCardBG,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableContainer,
  TableHead,
  TableHeaderCell,
} from "./styles";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentHistoryById } from "../../../store/actions";

export const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const dispatch = useDispatch();
  const { errors: error, paymentHistory } = useSelector(
    (state) => state.billingReducer
  );

  useEffect(() => {
    dispatch(GetPaymentHistoryById());
  }, []);

  // Example data
  const data = [
    {
      type: "Invoice",
      date: "12 Feb 2024",
      amount: "$1,882.00",
      description: "5x Extra Market (at $97.00 / month)",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "13 Feb 2024",
      amount: "$2,000.00",
      description: "Monthly Subscription",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "14 Feb 2024",
      amount: "$1,500.00",
      description: "Annual Subscription",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "15 Feb 2024",
      amount: "$1,200.00",
      description: "Consulting Services",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "16 Feb 2024",
      amount: "$1,300.00",
      description: "Product Purchase",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "17 Feb 2024",
      amount: "$1,600.00",
      description: "Service Fee",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "18 Feb 2024",
      amount: "$1,700.00",
      description: "Maintenance Fee",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "19 Feb 2024",
      amount: "$1,800.00",
      description: "Support Fee",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
    {
      type: "Invoice",
      date: "20 Feb 2024",
      amount: "$1,900.00",
      description: "Subscription Renewal",
      invoice: "Show Invoice",
    },
  ];

  // Calculate the rows to display based on current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <P fontSize="16px" fontweight="500" color="black">
        Payment History
      </P>
      <SubscriptionCardBG>
        <TableContainer>
          <OverflowWrapper>
            <Table>
              <TableHead>
                <tr>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Invoice/Receipt</TableHeaderCell>
                </tr>
              </TableHead>
              <tbody>
                {paymentHistory?.length > 0 ? (
                  paymentHistory?.map((item, index) => (
                    <TableBodyRow key={index}>
                      <TableBodyCell>
                        {item?.type ? item.type : "N/A"}
                      </TableBodyCell>
                      <TableBodyCell>
                        {item?.date ? item.date : "N/A"}
                      </TableBodyCell>
                      <TableBodyCell>
                        {item?.amount ? item.amount : "N/A"}
                      </TableBodyCell>
                      <TableBodyCell>
                        {item?.description ? item.description : "N/A"}
                      </TableBodyCell>
                      <TableBodyCell
                        color="#5867dd"
                        onClick={() => window.open(item?.invoiceUrl)}
                      >
                        Show Invoice
                      </TableBodyCell>
                    </TableBodyRow>
                  ))
                ) : (
                  <TableBodyRow>
                    <TableBodyCell>No record found</TableBodyCell>
                  </TableBodyRow>
                )}
              </tbody>
            </Table>
          </OverflowWrapper>
        </TableContainer>
        {/* <PaginationContainer>
          <NavigationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </NavigationButton>
          {[...Array(totalPages)].map((_, pageIndex) => (
            <PaginationButton
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              active={currentPage === pageIndex + 1}
            >
              {pageIndex + 1}
            </PaginationButton>
          ))}
          <NavigationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward />
          </NavigationButton>
        </PaginationContainer> */}
      </SubscriptionCardBG>
    </div>
  );
};
