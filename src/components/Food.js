import React from "react";

const Food = (props) => (
  <li className="menu-food">
    <p className="food-name">{props.details.name}</p>
    <button className="delete-food" onClick={() => props.deleteFood(props.i)}>
      Poista ruoka
    </button>
  </li>
);

export default Food;
