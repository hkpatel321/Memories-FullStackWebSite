import React from 'react';
import { Grid } from '@material-ui/core';  
import { Routes, Route, Link } from 'react-router-dom';  
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import { Redirect } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="885944597905-3bo5bt83v14mv0gj0ug18o40fnhp15j3.apps.googleusercontent.com">
      <Grid container spacing={3} justifyContent="center"> 
        <Navbar />
        <Routes> 
          <Route path="/" element={<Redirect to="/posts" />} /> 
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <Redirect to="/posts" />} />
        </Routes>
      </Grid>
    </GoogleOAuthProvider>
  );
}

export default App;
