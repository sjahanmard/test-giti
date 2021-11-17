import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import Router from "next/router";
import ContentTable from "../components/ContentTable";

const Panel = () => {
  const { token } = useContext(AuthContext);

  useEffect(async () => {
    if (token === "null") {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <ContentTable />
    </>
  );
};

export default Panel;
