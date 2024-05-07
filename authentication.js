// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDklp1JVgHET8ngx4jHqQXMM_pDOZFx7JQ",
  authDomain: "tpf-lab-39e72.firebaseapp.com",
  projectId: "tpf-lab-39e72",
  storageBucket: "tpf-lab-39e72.appspot.com",
  messagingSenderId: "379024218032",
  appId: "1:379024218032:web:065d7e7651869d45a52875",
  measurementId: "G-TTSW8199Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();



const userSignIn = async () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
}
const userSignOut = async () => {
  signOut(auth).then(() => {
    alert("You have been signed out!")
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
}

const nameInput = document.querySelector("#firstName");
const emailInput = document.querySelector("#exampleInputEmail1");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    nameInput.value = user.displayName;
    emailInput.value = user.email;
  }
})


const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

