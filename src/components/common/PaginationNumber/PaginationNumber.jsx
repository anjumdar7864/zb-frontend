import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const PaginationNumber = ({
  currentPage,
  onChange,
  availableNumberOfRows,
  currentlySelectedNumberOfRows,
  onChangeNumberOfRows,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / currentlySelectedNumberOfRows);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",

        width: "100%",
        // "& .MuiStack-root": {
        //   position: "relative",
        // },
        // "& .MuiTypography-root": {
        //   position: "absolute",
        //   left: "80%",
        // },
        // "& .MuiPagination-root": {
        //   position: "absolute",
        //   left: "50%",
        // },
        // "& .total": {
        //   position: "absolute",
        //   left: "12%",
        // },
        // "& .MuiInputBase-root": {
        //   position: "absolute",
        //   left: "85%",
        // },
        // "& .MuiPaginationItem-root": {
        //   borderRadius: "8px",
        //   border: "1px solid #ccc",
        //   color: "#000",
        //   "&.Mui-selected": {
        //     backgroundColor: "#1976d2",
        //     color: "#fff",
        //   },
        // },
      }}
    >
      {" "}
      <Typography
        className="total"
        variant="body2"
        sx={{ fontWeight: "500", fontSize: "14px" }}
      >
        Total: {totalItems}
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onChange(page)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              first: HiChevronDoubleLeft,
              last: HiChevronDoubleRight,
              previous: HiChevronLeft,
              next: HiChevronRight,
            }}
          />
        )}
        showFirstButton
        showLastButton
        sx={{
          "& .MuiStack-root": {
            position: "relative",
          },
          "& .MuiTypography-root": {
            position: "absolute",
            left: "80%",
          },
          "& .MuiPagination-root": {
            position: "absolute",
            left: "40%",
          },
          "& .MuiInputBase-root": {
            position: "absolute",
            left: "90%",
          },
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
            // border: "1px solid #ccc",
            color: "#000",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          },
        }}
      />
      <div
        style={{
          display: "flex ",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {" "}
        <Typography
          sx={{ fontWeight: "500", fontSize: "14px" }}
          variant="body2"
        >
          Entries
        </Typography>
        <Select
          value={currentlySelectedNumberOfRows}
          onChange={(e) => {
            onChange(1); // Reset to the first page when entries per page change
            onChangeNumberOfRows(e.target.value);
          }}
          size="small"
          variant="outlined"
          sx={{
            minWidth: 60,
          }}
        >
          {availableNumberOfRows.map((rows, index) => (
            <MenuItem value={rows} key={index}>
              {rows}
            </MenuItem>
          ))}
        </Select>
      </div>
    </Stack>
  );
};

export default PaginationNumber;
