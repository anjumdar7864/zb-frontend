import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
const PaginationComp = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              border: "solid 1px #E0E0E0",
            },
            "& .MuiPaginationItem-ellipsis": {
              border: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "#3086EE",
              color: "white",
              border: "solid 1px #E0E0E0",
            },
            "& .Mui-selected:hover": {
              backgroundColor: "blue",
              border: "solid 1px #E0E0E0",
            },
          }}
          showFirstButton
          showLastButton
          color="primary"
          count={totalPages} // Dynamically passed totalPages
          page={currentPage} // Dynamically passed currentPage
          onChange={onPageChange} // Handle page change
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              slots={{ first: RiArrowLeftDoubleLine, last: RiArrowRightDoubleLine }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default PaginationComp
