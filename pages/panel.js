import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import Router from "next/router";
import ContentTable from "../components/ContentTable";
import Cookies from "js-cookie";

const Panel = (props) => {
  const { token } = useContext(AuthContext);

  useEffect(async () => {
    if (token === "null") {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <ContentTable data={props.data} />
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { req } = context;
  let data = {};
  if (req) {
    const res = await fetch(
      `https://front-api-test.wsafar.com/posts?access-token=${req.cookies["token-giti"]}`
    );
    data = await res.json();
  }
  return {
    props: { data, cookies: req.cookies },
  };
};

export default Panel;
