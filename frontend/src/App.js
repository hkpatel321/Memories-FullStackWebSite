import React from 'react';

import {Container  } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import { Route,Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import {GoogleOAuthProvider} from '@react-oauth/google'
import {Redirect} from 'react-router-dom'
import PostDetails from './components/PostDetails/PostDetails.jsx';
function App() {
 const user=JSON.parse(localStorage.getItem('profile'));

  return (
<GoogleOAuthProvider clientId="885944597905-3bo5bt83v14mv0gj0ug18o40fnhp15j3.apps.googleusercontent.com">
<Container maxWidth='xl'>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={()=><Redirect to='/posts'/>}/>
          <Route path='/posts' exact component={Home}/>
          <Route path='/posts/search' exact component={Home}/>
          <Route path='/posts/:id' component={PostDetails}/>

          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        
          
      </Container>
      </GoogleOAuthProvider>
  );
}

export default App;
