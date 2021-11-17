import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Image from "next/Image";
import { Box } from "@mui/system";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import Router from "next/router";

const Navbar = (props) => {
  const { token, handleSetting } = useContext(AuthContext);

  const handleLogOut = async () => {
    await axios
      .delete(
        `https://front-api-test.wsafar.com/users/logout?access-token=${token}`
      )
      .then(async (res) => {
        Cookies.remove("token-giti", { path: "" });
        Cookies.remove("expiration-giti", { path: "" });
        await handleSetting("null", "null");
      })
      .catch((err) => console.log(err));
    Router.push("/");
  };
  return (
    <AppBar position="relative">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box justifyContent="start" alignItems="center" display="flex">
          <Button variant="filled" color="secondary" startIcon={<LoginIcon />}>
            {token !== "null" ? (
              <Link href="/panel"> Enter The Panel Page</Link>
            ) : (
              <Link href="/login"> Login</Link>
            )}
          </Button>
          {token !== "null" ? (
            <Button
              variant="filled"
              color="secondary"
              startIcon={<LogoutIcon />}
              onClick={handleLogOut}
            >
              Logout{" "}
            </Button>
          ) : null}
        </Box>
        <Box display="flex" alignItems="center">
          <HomeWorkIcon style={{ fontSize: 50, margin: 5 }} />
          <Typography variant="h6" fontWeight={700} color="inherit" noWrap>
            NEWS
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
