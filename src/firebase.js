import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database"; // Import ref and get

const firebaseConfig = {
    apiKey: "AIzaSyBQMYk2OiF6zJ9hYXFzKq-gUKFR2lEUfkM",
    authDomain: "hots-temp.firebaseapp.com",
    databaseURL: "https://hots-temp-default-rtdb.firebaseio.com",
    projectId: "hots-temp",
    storageBucket: "hots-temp.appspot.com",
    messagingSenderId: "56562543439",
    appId: "1:56562543439:web:0a9b4cd2f15e0f3411b33a",
    measurementId: "G-VTK63BD00P",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the functions for use in your component
export { database, ref, get };
