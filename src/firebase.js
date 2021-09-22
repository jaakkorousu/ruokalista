import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpJdjsSONNDflytbVETLkQm2Z0NrU323g",
  authDomain: "ruokalista-f3217.firebaseapp.com",
  databaseURL:
    "https://ruokalista-f3217-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ruokalista-f3217",
  storageBucket: "ruokalista-f3217.appspot.com",
  messagingSenderId: "100614683269",
  appId: "1:100614683269:web:a09412cfbc8402686047ec",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
