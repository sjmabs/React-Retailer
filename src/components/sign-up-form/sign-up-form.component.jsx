import { useState } from 'react';

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

    // create generic change handler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});

    }

    <div>
        <h1>Sign up with Email and Password</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
    </div>
}

export default SignUpForm;
