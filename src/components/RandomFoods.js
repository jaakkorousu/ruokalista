import React from "react";
import Food from "./Food";
class RandomFoods extends React.Component {
  renderRandomFoods = (key) => {
    if (!this.props.foods[key]) return null;
    return (
      <Food
        key={key}
        i={key}
        details={this.props.foods[key]}
        deleteFood={this.props.deleteFood}
      />
    );
  };

  render() {
    const randomFoodsId = Object.keys(this.props.randomFoods);
    return (
      <>
        <ul>{randomFoodsId.map(this.renderRandomFoods)}</ul>
        <button className="get-random" onClick={this.props.getRandomFood}>
          Arvo ruoka
        </button>
      </>
    );
  }
}

export default RandomFoods;
