import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCbrF359yM4DDkIxNOw84Bh4slYtreJCv0",
    authDomain: "cypher-f85f3.firebaseapp.com",
    projectId: "cypher-f85f3",
    storageBucket: "cypher-f85f3.appspot.com",
    messagingSenderId: "173646379751",
    appId: "1:173646379751:web:b8d45608234812a35c0042"
 };
  

/* initialize firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };


export const database = getFirestore()