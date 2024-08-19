import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Count() {

  const count = useSelector((state) => (state.counter.count))

  return (
    <div>
      <h2>Count: {count}</h2>
      <button >addCount</button>
      <button>subtractCount</button>
    </div>
  );
}
