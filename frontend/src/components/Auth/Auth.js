import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input.js';
import {GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import {signin,signup} from '../../actions/auth.js'
const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const [formData,setFormData]=useState(initialState);
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))

        }else{
            dispatch(signin(formData,history))
        }
        
    };

    const handleChange = (e) => {
       setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const switchMode=()=>{
           setIsSignup(!isSignup);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword ? 'text' : 'password'} 
                            handleShowPassword={handleShowPassword} 
                        />
                        {isSignup && (
                            <Input 
                                name="confirmPassword" 
                                label="Repeat Password" 
                                handleChange={handleChange} 
                                type="password" 
                            />
                        )}
                    </Grid>
                    <GoogleLogin
                  
                  onSuccess={async (response) => {
                    try {
                        
                        const token = response?.credential; 
                       
                
                        if (token) {
                           
                            const decodedToken = jwt_decode(token);
                            
                            const result = {
                                name: decodedToken?.name,
                                email: decodedToken?.email,
                                imageUrl: decodedToken?.picture,
                                googleId: decodedToken?.sub, 
                            };
                            
                
                            dispatch({ type: "AUTH", data: { result, token } });
                
                            localStorage.setItem("profile", JSON.stringify({ result, token }));
                
                            history.push("/");
                        } else {
                            console.error("Google authentication failed. Missing token.");
                        }
                    } catch (err) {
                        console.log("Error during Google login:", err);
                    }
                }}
                
                    onError={(err)=>console.log(err)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={() => setIsSignup((prev) => !prev)}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                       
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
