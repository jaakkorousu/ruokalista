import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import sampleFood from "../sample-food";
import firebase from "../firebase"; // eslint-disable-line no-unused-vars
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import RandomFoods from "./RandomFoods";
import Edit from "./Edit";

class App extends React.Component {
  constructor(props) {
    super(props);
    // load randomfoods from localstorage
    const appName = "Ruokalista";
    var localStorageRef = localStorage.getItem(appName);
    if (!localStorageRef) localStorageRef = "{}";
    this.state = {
      foods: {},
      randomFoods: JSON.parse(localStorageRef),
      appName: appName,
    };
  }
  loadSample = () => {
    this.setState({ foods: sampleFood });
  };
  addFood = (food) => {
    const foods = { ...this.state.foods };
    foods[`food${Date.now()}`] = food;
    this.setState({ foods });
  };
  deleteFood = (key) => {
    const foods = { ...this.state.foods };
    delete foods[key];
    if (Object.keys(this.state.randomFoods).indexOf(key) > -1) {
      this.removeRandomFood(key);
    }
    this.setState({ foods });
  };
  // Randomfoods
  randomProperty(obj) {
    var keys = Object.keys(obj);
    return keys[(keys.length * Math.random()) << 0];
  }
  getRandomFood = (key) => {
    if (
      Object.keys(this.state.randomFoods).length <
      Object.keys(this.state.foods).length
    ) {
      var f = this.randomProperty(this.state.foods);
      while (Object.keys(this.state.randomFoods).indexOf(f) > -1) {
        f = this.randomProperty(this.state.foods);
      }
      const randomFoods = { ...this.state.randomFoods };
      randomFoods[f] = f;
      this.setState({ randomFoods });
    }
  };
  removeRandomFood = (key) => {
    const randomFoods = { ...this.state.randomFoods };
    delete randomFoods[key];
    this.setState({ randomFoods });
  };

  componentDidMount() {
    // load randomfoods from localstorage
    // const localStorageRef = localStorage.getItem(this.state.appName);
    // if (localStorageRef)
    //   this.setState({ randomFoods: JSON.parse(localStorageRef) });
    // load from firebase
    const db = getDatabase();
    const firebaseRef = ref(db, `${this.state.appName}/foods`);
    onValue(firebaseRef, (snapshot) => {
      // console.log("load From Firebase");
      const data = snapshot.val();
      if (
        data !== null &&
        data.foods !== this.state.foods
        // data.foods !== undefined &&
        // data.foods !== null &&
        // data.foods !== this.state.foods
      )
        this.setState({ foods: data });
    });
  }

  componentDidUpdate() {
    // save to firebase
    const db = getDatabase();
    set(ref(db, this.state.appName), {
      foods: this.state.foods,
    });
    //save to localstorage
    localStorage.setItem(
      this.state.appName,
      JSON.stringify(this.state.randomFoods)
    );
  }
  componentWillUnmount() {
    const db = getDatabase();
    const firebaseRef = ref(db, this.state.appName);
    off(firebaseRef);
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <h1>Ruokalista</h1>
              <RandomFoods
                randomFoods={this.state.randomFoods}
                getRandomFood={this.getRandomFood}
                deleteFood={this.removeRandomFood}
                foods={this.state.foods}
              />
            </Route>
            <Route exact path="/edit">
              <Edit
                foods={this.state.foods}
                addFood={this.addFood}
                loadSample={this.loadSample}
                appName={this.state.appName}
              />
            </Route>
          </Switch>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">Ruokalista</Link>
              </li>
              <li>
                <Link to="edit/">Muokkaa</Link>
              </li>
            </ul>
          </nav>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
