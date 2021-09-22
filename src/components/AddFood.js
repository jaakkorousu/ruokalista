import React from "react";

class AddFood extends React.Component {
  nameRef = React.createRef();
  addFood = (e) => {
    e.preventDefault();
    const food = { name: this.nameRef.current.value };
    this.props.addFood(food);
    e.currentTarget.reset();
  };
  render() {
    return (
      <form className="add-food" onSubmit={this.addFood}>
        <input type="text" name="name" ref={this.nameRef} />
        <button type="submit">Lisää ruoka</button>
      </form>
    );
  }
}

export default AddFood;
