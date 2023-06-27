import { useState } from 'react';
import { signUserInWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    email: '',
    password: '',

}

const SignInForm = () => {

    // add useState to component and pass it the empty values of object above
    const [formFields, setFormFields] = useState(defaultFormFields);

    // destructure and set as current formFields
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // sign in with google
    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            console.log(error);
        }
    }

    // handle form subimission - check if user is in db
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password ) {
            console.log("Please enter your email and password")
            return;
        }

        
        // need to change this section as this is for user creation.
        // need to make a function to check if user exists and verify password etc

        try {
            const { user } = await signUserInWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password' :
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found' :
                    alert("No user associated with this email");
                    break;
                default : 
                    console.log(error);
            };
        }


    }

    // create generic change handler
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});

    }


    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <div className='buttons-container'>
                    <Button buttonType='' type="submit">Sign In</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google Sign In</Button>

                </div>

            </form>
        </div>
    )
};

export default SignInForm;