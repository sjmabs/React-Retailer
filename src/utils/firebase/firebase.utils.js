import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALxxpODBhaOmrlC7YpRMKIDUVnoIK7PRk",
    authDomain: "crwn-clothingdb-d9fea.firebaseapp.com",
    projectId: "crwn-clothingdb-d9fea",
    storageBucket: "crwn-clothingdb-d9fea.appspot.com",
    messagingSenderId: "728299265633",
    appId: "1:728299265633:web:b695cbd7bc4d5aca141420"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// google specific provider params
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>signInWithPopup(auth, googleProvider);

// gets firebase db
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    
    // get a snapshot to check if exists
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot.exists());

    // if user data exists {
        // return the user
    // }

    if(!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("Error Creating User!", error.message);
        }
    }

    return userDocRef;
};

export const signUserInWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password)
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);