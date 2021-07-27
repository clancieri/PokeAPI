import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./redux/ducks/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

const handleIncrement = () => {
  dispatch(increment());
};

return (
  <div style={{background: "lightgrey", margin: "10px"}}>
    <h3>{`Count: ${count}`}</h3>
    <div style={{ display: "flex", justifyContent: "center"}}>
      <button variant="contained" onClick={handleIncrement}> Increment </button>
    </div>
  </div>
);
};

export default Counter;
