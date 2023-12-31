import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {
    getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
        
    });
    
    await batch.commit();
    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'collections');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };


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


// on auth state changed looks for any auth changes such as sign in and out and runs a callback function every time this happens
// it is an open listener so it is always listening - need to tell it to stop listening everytime it unmounts otherwise we get a memory leak.
export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);
