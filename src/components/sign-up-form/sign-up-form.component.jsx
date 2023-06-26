import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    // add useState to component and pass it the empty values of object above
    const [formFields, setFormFields] = useState(defaultFormFields);

    // destructure and set as current formFields
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    // handle for submits
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword || !displayName) {
            console.log("data missing")
            return;
        }
        if (password !== confirmPassword) {
            console.log('passwords don\'t match');
            return;
        } 

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            user.displayName = displayName;
            await createUserDocumentFromAuth(user)
            resetFormFields()
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Account already exists for this email address.")
            } else {
                console.log('error: User Creation encountered an error', error);
            }
        }

    }

    // create generic change handler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

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

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                <Button buttonType='' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
