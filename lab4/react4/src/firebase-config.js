import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  

const firebaseConfig = {

    apiKey: "AIzaSyCTIXnX9iImdFdKEfAivu7Kj8weovlwfFY",
  
    authDomain: "piwo-react-lab-4.firebaseapp.com",
  
    projectId: "piwo-react-lab-4",
  
    storageBucket: "piwo-react-lab-4.appspot.com",
  
    messagingSenderId: "209237946425",
  
    appId: "1:209237946425:web:1c4a17fab34bccf6861de8",

    measurementId: "G-6BR4YG07LJ"
  
  };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const Auth = getAuth(app);
 const storage = getStorage(app);

export {app, db, Auth, storage}

 
