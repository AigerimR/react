import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainPage.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Main: React.FC = () => {
  const form1Values = useSelector((state: RootState) => state.form1Values);

  return (
    <div className={classes.linkslist}>
      <Link to="/form1">Uncotnrolled Form</Link>
      <Link to="/form2">React Hook Form</Link>
      {form1Values.name !== "" && (
        <div>
          <p>{form1Values.name}</p>
          <p>{form1Values.age}</p>
          <p>{form1Values.email}</p>
          <p>{form1Values.password1}</p>
          <p>{form1Values.gender}</p>
          <div>
            {form1Values.file ? (
              <img
                src={form1Values.file}
                alt="Uploaded"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            ) : (
              <span>No file uploaded</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
