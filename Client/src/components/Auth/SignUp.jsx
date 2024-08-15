import React, { useState } from 'react';
import classes from  "../Auth/"
import '@fortawesome/fontawesome-free/css/all.min.css'
const SignUp = () => {
    const [formData, setFormData] = useState({
        username: 'eldanna1',
        firstName: 'elda',
        lastName: 'gebru',
        email: '',
        password: '12345677'
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('https://localhost/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    // Handle success
                    console.log('User registered successfully');
                } else {
                    // Handle error
                    console.log('Error in registration');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            <h2>Join the Network</h2>
            <p>Already have an account? <a href="/signin">Sign in</a></p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
            <div className='form-row'>
                <div className="form-group-inline">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className="form-group-inline">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder='Last Name'
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
            </div>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span className= "password-toggle" onClick={togglePasswordVisibility}>
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </span>
                    {errors.password && <span className="error">{errors.password}</span>}
                    <p>I agree to the <a href="/privacypolicy">privacy policy</a> and <a href="/termsofservice">terms of service</a>.</p>
                </div>
                <button type="submit">Agree and Join</button>
            </form>
            <div className="signup-footer">
                <p><a href="/login">Already have an account?</a></p>
            </div>
        </div>
    );
};

export default SignUp;