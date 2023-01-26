import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Container } from '@mui/material';

import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';

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
        <NavLink activeclassname='active' to='/'>
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink activeclassname='active' to='/foodlog/today'>
              Today
            </NavLink>
            <NavLink activeclassname='active' to='/foodlog/yesterday'>
              Yesterday
            </NavLink>
            <NavLink activeclassname='active' to='/stats'>
              Stats
            </NavLink>
            <Link to='/' onClick={logout} className='right'>
              Logout
            </Link>
          </>
        ) : (
          <>
            <NavLink activeclassname='active' to='/login' className='right'>
              Login
            </NavLink>
            <NavLink activeclassname='active' to='/register' className='right'>
              Register
            </NavLink>
          </>
        )}
      </Container>
    </div>
  );
}
