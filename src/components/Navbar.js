import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const { id } = useParams();

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

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

          <Link to='/colors'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Colors
            </Typography>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to='/foodlog/today'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Food Log Today
                </Typography>
              </Link>
              <Link to='/foodlog/yesterday'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Food Log Yesterday
                </Typography>
              </Link>
              {/* <Link to='/foodlog/past/:id'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Food Log Past
                </Typography>
              </Link> */}
              <Link to='/stats'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Stats
                </Typography>
              </Link>
              <Link to='/' onClick={logout}>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Logout
                </Typography>
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
