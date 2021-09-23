import React from "react";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Food from "./Food";
import AddFood from "./AddFood";

class Edit extends React.Component {
  state = {
    uid: null,
    owner: null,
  };
  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // console.log("***");
        // console.log(user);
        this.authHandler({ user });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  authHandler = (authData) => {
    // haetaan firebasesta
    const dbRef = ref(getDatabase());
    // get(child(dbRef, "/owner"))
    get(dbRef)
      .then((snapshot) => {
        // if (snapshot.exists()) {
        // console.log(authData);
        console.log(snapshot.val());
        console.log(snapshot.val().owner);
        if (!snapshot.val().owner) {
          console.log("No data available");
          const db = getDatabase();
          // set(ref(db, "owner"), {
          set(ref(db), {
            owner: authData.user.uid,
          });
        }
        // console.log(snapshot.val().data);
        this.setState({
          uid: authData.user.uid,
          owner: snapshot.val().data || authData.user.uid,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  authenticate() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // console.log(result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...
        // console.log(credential);
        // console.log(token);
        // console.log(user);
        // user.uid
      })
      .catch((error) => {
        // Handle Errors here.
        /*         const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error); */
        // ...
        console.log(error.message);
      });
  }
  logout = async () => {
    console.log("Logging out!");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful
        this.setState({ uid: null });
      })
      .catch((error) => {
        // An error happened
      });
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    if (!this.state.uid) {
      return (
        <button className="google" onClick={this.authenticate}>
          Kirjaudu Googlella
        </button>
      );
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Ainoastaan omistajalla on oikeus muokata listaa</p>
          {logout}
        </div>
      );
    }
    return (
      <>
        <ul className="foods">
          {Object.keys(this.props.foods).map((key) => (
            <Food
              key={key}
              i={key}
              details={this.props.foods[key]}
              deleteFood={this.props.deleteFood}
            />
          ))}
        </ul>
        <AddFood addFood={this.props.addFood} />
        <button onClick={this.props.loadSample}>Lataa näyte</button>
        {logout}
      </>
    );
  }
}
export default Edit;
