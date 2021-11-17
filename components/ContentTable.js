import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Button, Grid, Pagination, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";

export default function ContentTable() {
  const { token } = React.useContext(AuthContext);
  const [items, setItems] = React.useState({ items: [] });
  const [page, setPage] = React.useState(1);

  React.useEffect(async () => {
    await axios
      .get(`https://front-api-test.wsafar.com/posts?access-token=${token}`)
      .then((res) => {
        setItems(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [token]);
  React.useEffect(async () => {
    await axios
      .get(
        `https://front-api-test.wsafar.com/posts?access-token=${token}&page=${page}`
      )
      .then((res) => {
        setItems(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [page]);
  const CustomPagination = () => {
    return (
      <Pagination
        count={items?._meta?.totalCount}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
      />
    );
  };
  const handlePageChange = (e, v) => {
    setPage(v);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let data = [];
    let data1 = [];
    let formData = new FormData(e.target).get("search");
    console.log(formData);
    if (formData === "") {
      console.log("karbala1");
      await axios
        .get(`https://front-api-test.wsafar.com/posts?access-token=${token}`)
        .then((res) => {
          setItems(res.data.result);
        })
        .catch((err) => console.log(err));
      return;
    } else {
      console.log("karbala2");
      await axios
        .get(
          `https://front-api-test.wsafar.com/posts?access-token=${token}&filter[title]=${formData}`
        )
        .then((res) => {
          data = res.data.result.items;
        })
        .catch((err) => console.log(err));
      await axios
        .get(
          `https://front-api-test.wsafar.com/posts?access-token=${token}&filter[content]=${formData}`
        )
        .then((res) => {
          data1 = res.data.result.items;
        })
        .catch((err) => console.log(err));
      setItems((prevState) => {
        return { ...prevState, items: [...data, ...data1] };
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          marginTop={1}
          marginBottom={1}
        >
          <Grid item>
            {" "}
            <TextField
              id="search"
              name="search"
              label="Search"
              type="search"
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item>
            {" "}
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="secondary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <div style={{ height: "82vh", width: "100%" }}>
        <DataGrid
          rows={items?.items}
          columns={columns}
          Pagination
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
      <Grid container justifyContent="center">
        <Grid item>
          <Stack spacing={2}></Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "title", headerName: "Title", width: 100 },
  { field: "content", headerName: "Content", width: 200 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "created_at", headerName: "Creation Time", width: 200 },
  { field: "updated_at", headerName: "Update Time", width: 200 },
];
