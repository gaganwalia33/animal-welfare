import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIKBBWdXd3Z_o_H1xcGMqCADFbNMC80Fw",
  authDomain: "animal-welfare-e5ce8.firebaseapp.com",
  projectId: "animal-welfare-e5ce8",
  storageBucket: "animal-welfare-e5ce8.appspot.com",
  messagingSenderId: "gagan.walia5678@gmail.com",
  appId: "YOUR_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



// For signing in
const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User signed in
    } catch (error) {
        console.error("Error signing in:", error);
    }
};

// For signing up
const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User signed up
    } catch (error) {
        console.error("Error signing up:", error);
    }
};