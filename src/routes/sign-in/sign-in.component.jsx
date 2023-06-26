import { signInWithGooglePopup, createUserDocumentFromAuth }from '../../utils/firebase/firebase.utils.js'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import { 
    auth, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect 
}from '../../utils/firebase/firebase.utils.js'



const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUpForm />
      
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
 
        </div>


    );
};

export default SignIn;