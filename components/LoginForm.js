import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { useContext, useState } from "react";
import Router from "next/router";

export default function SignIn() {
  const { handleSetting } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios
      .post("https://front-api-test.wsafar.com/users/login", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        setError(null);
        if (res.data.ok) {
          handleSetting(
            res.data.result.access_token,
            res.data.result.expire_at
          );
          Router.push("/panel");
        }
      })
      .catch((err) => {
        setError("Username or Password is incorrect");
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper style={{ padding: 10, marginTop: 20 }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && (
                <Typography variant="p" component="p" color="error">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
