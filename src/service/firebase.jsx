// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvoI5a9BqKKAKKIJVNn6Losr8VkMEAdak",
    authDomain: "packgo-f7b70.firebaseapp.com",
    projectId: "packgo-f7b70",
    storageBucket: "packgo-f7b70.firebasestorage.app",
    messagingSenderId: "395818318652",
    appId: "1:395818318652:web:a37c1ef75bfb0726d1bc39",
    measurementId: "G-2MQ2W9LB3R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
