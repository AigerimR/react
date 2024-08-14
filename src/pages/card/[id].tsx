import { NextPage } from "next";
import dynamic from "next/dynamic";
const Main = dynamic(() => import("../../views/MainPage"), { ssr: false });

const MainNext: NextPage = () => {
  return <Main />;
};

export default MainNext;
