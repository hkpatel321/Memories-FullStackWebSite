import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
        localStorage.removeItem('profile');
    };

    useEffect(() => {
        const token = user?.token;
     
        // Logout if token is expired
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        const storedUser = JSON.parse(localStorage.getItem('profile'));
        setUser(storedUser);

    }, [location, user?.token]);  

    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src="memories-Logo.png" alt='icon' height="60" />
                <img className={classes.image} src='memories-Text.png' alt="memories" height="40" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result?.name} src={user.result?.imageUrl}>
                            {user.result?.name?.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result?.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
