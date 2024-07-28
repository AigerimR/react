import React from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { clearCheckboxLsit } from "../../app/slices/checkboxSlice";
import classes from "./flyout.module.scss";

const Flyout: React.FC = () => {
  const checkboxes = useSelector((state: RootState) => state.checkboxes);

  const dispatch = useDispatch();

  function deleteAllCheckedItems(): void {
    dispatch(clearCheckboxLsit());
  }

  return (
    <>
      {checkboxes.length > 0 && (
        <div className={classes.flyout}>
          <p>{checkboxes.length} items are selected</p>
          <button onClick={deleteAllCheckedItems}>Unselect all</button>
        </div>
      )}
    </>
  );
};

export default Flyout;
