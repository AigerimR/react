import { describe, expect, it } from "vitest";
import checkboxReducer, {
  addToCheckboxList,
  removeFromCheckboxList,
  clearCheckboxLsit,
} from "./slices/checkboxSlice";

describe("store", () => {
  it("returns initialState when passed empty action", () => {
    const result = checkboxReducer(undefined, { type: "" });
    expect(result).toEqual([]);
  });

  it(`adds given id when passed 'addToCheckboxList' action`, () => {
    const action = { type: addToCheckboxList.type, payload: 123 };
    const result = checkboxReducer([], action);
    expect(result).toEqual([123]);
  });

  it(`removes given id when passed 'removeFromCheckboxList' action`, () => {
    const checkboxList = [123, 456, 789];
    const action = { type: removeFromCheckboxList.type, payload: 456 };
    const result = checkboxReducer(checkboxList, action);
    expect(result).toEqual([123, 789]);
  });

  it(`clear checkboxlist when passed 'clearCheckboxLsit' action`, () => {
    const checkboxList = [123, 456, 789];
    const action = { type: clearCheckboxLsit.type };
    const result = checkboxReducer(checkboxList, action);
    expect(result).toEqual([]);
  });
});
