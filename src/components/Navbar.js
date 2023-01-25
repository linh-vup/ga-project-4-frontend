import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, NavLink, Link, useParams } from 'react-router-dom';
import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';
import Container from '@mui/material/Container';

import '../styles/navbar.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div id='nav-bar-wrapper'>
      <Container maxWidth='lg' id='nav-bar'>
        <NavLink activeClassName='active' to='/'>
          Home
        </NavLink>

        <NavLink activeClassName='active' to='/colors'>
          Colors
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink activeClassName='active' to='/foodlog/today'>
              Today
            </NavLink>
            <NavLink activeClassName='active' to='/foodlog/yesterday'>
              Yesterday
            </NavLink>
            <NavLink activeClassName='active' to='/stats'>
              Stats
            </NavLink>
            <Link to='/' onClick={logout} className='right'>
              Logout
            </Link>
          </>
        ) : (
          <>
            <NavLink activeClassName='active' to='/login' className='right'>
              Login
            </NavLink>
            <NavLink activeClassName='active' to='/register' className='right'>
              Register
            </NavLink>
          </>
        )}
      </Container>
    </div>
  );
}
