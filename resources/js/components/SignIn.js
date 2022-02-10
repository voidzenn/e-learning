import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import Footer from './layouts/Footer';
import { 
  signIn,
  validateEmail,
  validatePassword
} from '../actions/userAuthActions';

const SignIn = ({ user_auth, signIn, validateEmail, validatePassword }) => {
  const navigate = useNavigate();
  // check if no error on sign in then navigate to dashboard
  useEffect(() => {
    if (user_auth.errors === false) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2500);  
      return() => clearTimeout(timer);
    }
  }, [user_auth.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // this is for the text input form data
    const data = new FormData(event.currentTarget);
    // calling signIn from the action creator
    signIn(data);
  };


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {
        user_auth.errors === false ?
        <Dialog 
          fullWidth 
          open={true} 
          maxWidth="xs" 
          sx={{ marginTop: '-5%' , backdropFilter: 'blur(5px)' }} 
          align="center"
        >
          <DialogTitle>
            Signing In... 
            <CircularProgress 
              color="primary" 
              sx={{ float: 'right', marginRight: '90px', marginTop: '-5px' }} 
            >
            </CircularProgress>
          </DialogTitle>
        </Dialog>
        : null
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(images/bg-1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            user_auth.errors === true ?
            <Typography component="h6" variant="h6" style={{ color: 'red' }}>
              { user_auth.message }
            </Typography>
            : null
          }
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              onKeyUp={ (e) => {validateEmail(e.target.value)} }
              id="email"
              type="email"
              helperText={ user_auth.email === '' || user_auth.email === undefined ? '' : user_auth.email }
              error={ user_auth.email === '' || user_auth.email === undefined ? false : true }
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              onKeyUp={ (e) => {validatePassword(e.target.value)} }
              helperText={ user_auth.password === '' || user_auth.password === undefined ? '' : user_auth.password }
              error={ user_auth.password === '' || user_auth.password === undefined ? false : true }
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={ user_auth.submitDisabled == false ? false : true }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Links href="#" variant="body2">
                  Forgot password?
                </Links>
              </Grid>
              <Grid item>
                <Links component={RouterLink} to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Links>
              </Grid>
            </Grid>
            <Footer sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const mapToStateProps = state => {
  return {
    user_auth: state.user_auth,
  };
};

export default connect(mapToStateProps, {
   signIn, validateEmail, validatePassword 
})(SignIn);