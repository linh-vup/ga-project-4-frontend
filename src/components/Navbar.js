import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box sx={{ flexgrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense' className='Navbar'>
          <Link to='/'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/login'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Login
            </Typography>
          </Link>
          <Link to='/register'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Register
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
