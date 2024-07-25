import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
        let new_url = `${url}${endpoint}`;

        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                loadCartData({ token: response.data.token });
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> 
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                            aria-label="Your name"
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                        aria-label="Your email"
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                        aria-label="Password"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : (currState === "Login" ? "Login" : "Create account")}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">By continuing, I agree to the terms of use & privacy policy.</label>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
