import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [user, setUser] = useState(null);

  // Fetch user status
  const fetchUser = () => {
    axios.get('https://projectportfolio-production-a923.up.railway.app/me',{ withCredentials: true })
    // axios.get('http://localhost:5000/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    fetchUser();

    // Listen for login event from anywhere in the app
    window.addEventListener('userUpdated', fetchUser);

    return () => {
      window.removeEventListener('userUpdated', fetchUser);
    };
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const handleAvatarClick = () => {
    if (user) {
      if (isHome) {
        navigate('/admin');
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    // await axios.get('http://localhost:5000/logout');
    await axios.get('https://projectportfolio-production-a923.up.railway.app/logout',{ withCredentials: true });
    setUser(null);
    navigate('/', { replace: true });

    // Optional: also notify any other component if needed
    window.dispatchEvent(new Event('userUpdated'));
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'blur(8px)',
        padding: '0.5rem 1rem',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* About link */}
          {user && !isHome ? (
            <IconButton edge="start" color="inherit" onClick={goBack}>
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>

          ) : (
            <Button
              color="inherit"
              onClick={() => window.open('https://portfolio-11202.web.app/', '_blank')}
              sx={{
                color: 'white',
                mr: 1,
                ml:20,
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              About
            </Button>)}
        </Box>

        <Box>
          {user && !isHome ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          ) : (
            <IconButton edge="end" onClick={handleAvatarClick}>
              <Avatar
                alt="Avatar"
                src="/profile.jpg" // Your image path
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
