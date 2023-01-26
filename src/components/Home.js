import Container from '@mui/material/Container';
import Carousel from './common/Carousel';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuthenticated } from '../hook/useAuthenticated';

import '../styles/Home.scss';
import fruits from '../images/fruits.png';

export default function Home() {
  const [isLoggedIn] = useAuthenticated();

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>
              Eat the <span className='rainbow-animation'>Rainbow!</span>
            </h1>
            <h3>
              Forget about your 5 a day.
              <br />
              It's a rainbow a day to keep the doctor away &#127752;
            </h3>
            <img src={fruits} alt='fruits logo' className='fruits-logo' />
            <Grid container sx={{ display: 'inLineflex' }}>
              {isLoggedIn ? (
                <Link to='/foodlog/today' className='button'>
                  Log your rainbow
                </Link>
              ) : (
                <Link to='/login' className='button'>
                  Log in to log
                </Link>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
