import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, subtract} from '../store/counter';

export default function Count() {
  // useDispatch to change the state
  const dispatch = useDispatch()
  const count = useSelector((state) => (state.counter.count))

  function addCountFn() {
    dispatch(add(1))
  }

  function subtractCountFn() {
    dispatch(subtract(1))
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={addCountFn}>addCount</button>
      <button onClick={subtractCountFn}>subtractCount</button>
    </div>
  );
}
