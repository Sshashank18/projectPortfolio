import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

axios.defaults.withCredentials = true;

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', form);

      window.dispatchEvent(new Event('userUpdated'));

      navigate('/admin');
    } catch (err) {
      alert('Login failed');
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
