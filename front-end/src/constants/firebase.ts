import { initializeApp } from "firebase/app";

import "firebase/firestore";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwPlYywdjDQNvtFFyl3fIbcBozkbjsmuA",

  authDomain: "todo-clone-react-app.firebaseapp.com",

  projectId: "todo-clone-react-app",

  storageBucket: "todo-clone-react-app.appspot.com",

  messagingSenderId: "660308157359",

  appId: "1:660308157359:web:aaed1b4089952318c0855a",
};

const app = initializeApp(firebaseConfig);
const DB = getFirestore(app);

export default DB;
