import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

import {
  addCatDialogData,
  fetchCategories,
  freshStateCategory,
} from "../../../actions/category";
import AlertContent from "../subcontents/AlertContent";
import CategoryAdminDialog from "../subcontents/CategoryAdminDialog";
import Pagination from "../subcontents/Pagination";
import WordContent from "./WordContent";

const CategoryAdmin = (props) => {
  // This is used to make the Dialog content dynamic
  const [type, setType] = useState("");
  const [openWord, setOpenWord] = useState(false);
  // Set the id of WordContent to be delete
  const [wordId, setWordId] = useState(null);

  useEffect(() => {
    /* 
      We need to remove the cookie value of currentCategoryPage. When
      the cookie is removed, the user can now go back to first page on 
      page reload.
    */
    props.cookies.remove("currentCategoryPage");
    // When fetching the categories data, we need to pass the token.
    props.fetchCategories(props.userAuth.token);
  }, []);

  useEffect(() => {
    // Get the wordContent cookie data
    const wordContentData = props.cookies.get("wordContent");
    // If wordContent cookie has data then assign it to stase wordContent and open Word
    if (wordContentData !== undefined) {
      setOpenWord(true);
    } else {
      setOpenWord(false);
    }
  }, [openWord]);

  useEffect(() => {
    /* 
      This will run if there is a request or when a request has 
      a message response. After a request it will re-render the 
      categories.
    */
    if (props.requestErrorMessage !== "") {
      const currentValue = props.cookies.get("currentCategoryPage");
      /*
        Check in the cookies if currentCategoryPage is not empty
        then pass it in the fetching of categories.
      */
      if (currentValue !== "") {
        props.fetchCategories(props.userAuth.token, currentValue);
      } else {
        props.fetchCategories(props.userAuth.token, 1);
      }
    }
  }, [props.requestErrorMessage]);
  /*
    Type is for what type of content will be shown on Dialog.
    Data is for the form data input values.
  */
  const handleDialog = (type, data) => {
    // Re-intialized the dialog data before opening Dialog
    props.freshStateCategory();
    // Assign the dialog with data
    props.addCatDialogData(data);
    // Set type for Dialog content
    setType(type);
  };

  const tableCellStyles = {
    fontSize: "18px",
  };

  const handleOnPageChange = (e, value) => {
    /* 
      We should add 1 to value because the TablePagination next page
      , when clicked will return 1 instead of 2, for the pagination 
      request to laravel controller to properly work.
    */
    value += 1;
    /* 
      We need to assign a value inside a cookie to retrieve the current
      page value , so the categories table would not go to the first page
      if editing or deleting a row.
    */
    props.cookies.set("currentCategoryPage", value, { path: "/categories" });
    props.fetchCategories(props.userAuth.token, value);
  };
  // Handles in making the Word component visible
  const handleWords = (data) => {
    if (data !== "") {
      /* 
        When the Word component is open, we should a data in the cookie. So that on page 
        reload, you can check in the cookie, if wordContent cookie is not empty then open 
        the word and get the cookie word content data.
      */
      props.cookies.set("wordContent", data, { path: "/" });
      // Open Word component
      setOpenWord(true);
      // Re-initialize the state when opening another component
      props.freshStateCategory();
    }
  };
  // Pass this function to Word Content so that the deletion request is in that component
  const handleDeleteWordChoice = (id) => {
    setWordId(id);
  };

  return (
    <React.Fragment>
      <Container>
        <CategoryAdminDialog
          type={type}
          setType={setType}
          handleDeleteWordChoice={handleDeleteWordChoice}
        ></CategoryAdminDialog>
        <Grid container>
          <Grid item xs={6}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Categories
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {props.requestErrorMessage !== "" ? (
              <AlertContent
                isError={props.requestError}
                message={props.requestErrorMessage}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
      {openWord ? (
        <WordContent
          setOpenWord={setOpenWord}
          handleDialog={handleDialog}
          wordId={wordId}
          setWordId={setWordId}
        />
      ) : null}

      {openWord === false ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Button
            variant="outlined"
            sx={{ mt: 2, mb: -3, mr: 5, float: "right" }}
            onClick={() => {
              handleDialog("create");
            }}
          >
            Create Category
          </Button>
          <TableContainer sx={{ maxHeight: 1200 }}>
            <Table stickyHeader aria-label="sticky table" sx={{ p: 5 }}>
              <TableHead style={{ backgroundColor: "orange" }}>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Title</TableCell>
                  <TableCell sx={tableCellStyles}>Description</TableCell>
                  <TableCell sx={tableCellStyles}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.categories.length !== 0
                  ? Object.entries(props.categories.data).map(
                      ([key, category]) => (
                        <React.Fragment key={key}>
                          <TableRow
                            style={
                              key % 2
                                ? {
                                    background: "#F2F2F2",
                                  }
                                : {
                                    background: "white",
                                  }
                            }
                          >
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              <Grid
                                justify="space-between"
                                container
                                spacing={8}
                              >
                                <Grid item xs={2}>
                                  <Tooltip title="Add Words">
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        minWidth: "30px",
                                        minHeight: "30px",
                                      }}
                                      onClick={() => {
                                        handleWords({
                                          index: key,
                                          categoryId: category.id,
                                          categoryName: category.name,
                                          categoryDescription:
                                            category.description,
                                        });
                                      }}
                                    >
                                      <Add
                                        sx={{
                                          fontSize: "20px",
                                        }}
                                      ></Add>
                                    </Button>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={2}>
                                  <Tooltip title="Edit Category">
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        minWidth: "30px",
                                        minHeight: "30px",
                                      }}
                                      onClick={() => {
                                        handleDialog("edit", {
                                          index: key,
                                          categoryId: category.id,
                                          categoryName: category.name,
                                          categoryDescription:
                                            category.description,
                                        });
                                      }}
                                    >
                                      <Edit
                                        sx={{
                                          fontSize: "20px",
                                        }}
                                      ></Edit>
                                    </Button>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={2}>
                                  <Tooltip title="Delete Category">
                                    <Button
                                      variant="outlined"
                                      sx={{
                                        minWidth: "30px",
                                        minHeight: "30px",
                                      }}
                                      size="small"
                                      onClick={() => {
                                        handleDialog("delete", {
                                          categoryId: category.id,
                                          categoryName: category.name,
                                        });
                                      }}
                                    >
                                      <Delete
                                        sx={{
                                          fontSize: "20px",
                                          color: "red",
                                        }}
                                      ></Delete>
                                    </Button>
                                  </Tooltip>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      )
                    )
                  : null}
              </TableBody>
            </Table>
            {props.categories.length !== 0 ? (
              <Pagination
                total={props.categories.total}
                page={props.categories.current_page}
                rowsPerPage={props.categories.per_page}
                handleOnPageChange={handleOnPageChange}
              />
            ) : null}
          </TableContainer>
        </Paper>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userAuth: state.auth.userAuth,
    categories: state.category.categories,
    categoryError: state.category.categoryError,
    requestError: state.category.requestError,
    requestErrorMessage: state.category.requestErrorMessage,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapStateToProps, {
    fetchCategories,
    addCatDialogData,
    freshStateCategory,
  })(CategoryAdmin)
);
