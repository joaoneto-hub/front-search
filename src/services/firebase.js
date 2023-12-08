import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5_2Pmf9WqDUm6vqyz03dQxBwjmhu5H6s",
  authDomain: "api-hub-searchtag.firebaseapp.com",
  projectId: "api-hub-searchtag",
  storageBucket: "api-hub-searchtag.appspot.com",
  messagingSenderId: "1036057883615",
  appId: "1:1036057883615:web:1b352d1289164a1ae4ca6a",
  measurementId: "G-CFZHVLPL41",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
