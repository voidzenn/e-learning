import React from "react";

import { TablePagination } from "@mui/material";

const Pagination = (props) => {
  return (
    <TablePagination
      component="div"
      labelRowsPerPage=""
      rowsPerPageOptions={[]}
      count={props.total !== undefined ? props.total : 0}
      page={props.page !== undefined ? props.page - 1 : 0}
      rowsPerPage={props.rowsPerPage !== undefined ? props.rowsPerPage : 0}
      onPageChange={props.handleOnPageChange}
      sx={{ mr: 4, mt: -3 }}
    />
  );
};

export default Pagination;
