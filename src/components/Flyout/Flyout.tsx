import React from "react";
import classes from "./flyout.module.scss";

import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import { clearCheckboxLsit } from "../../app/slices/checkboxSlice";

const Flyout: React.FC = () => {
  const checkboxes = useSelector((state: RootState) => state.checkboxes);

  const dispatch = useDispatch();

  function deleteAllCheckedItems(): void {
    console.log("delete");

    dispatch(clearCheckboxLsit());
  }

  return (
    <>
      {checkboxes.length > 0 && (
        <div className={classes.flyout}>
          <p>{checkboxes.length} items are selected</p>
          <button onClick={deleteAllCheckedItems}>Unselect all</button>
          <button>Download</button>
        </div>
      )}
    </>
  );
};

export default Flyout;
