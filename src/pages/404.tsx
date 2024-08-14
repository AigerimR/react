import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div>
      <h2>OOPS THIS IS 404</h2>
      <Link href="/">Go home</Link>
    </div>
  );
};

export default NotFound;
