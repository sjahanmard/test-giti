import wall2 from "../wall2.jpg";
import { Container, Typography } from "@mui/material";
import Head from "next/head";
import { CssBaseline } from "@mui/material";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${wall2.src})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "auto",
      }}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container
        style={{
          minHeight: "100vh",
          zIndex: 3,
          position: "relative",
          background: "inherit",
          overflow: "hidden",
        }}
      ></Container>
    </div>
  );
}
