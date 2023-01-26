import Container from '@mui/material/Container';
import Carousel from './common/Carousel';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import '../styles/Home.scss';

export default function Home() {
  return (
    <>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item>
            <h1>
              Eat the <span className='rainbow-animation'>Rainbow!</span>
            </h1>
            <h3>
              Forget about your 5 a day.
              <br />
              It's a rainbow a day to keep the doctor away &#127752;
            </h3>
            <Carousel></Carousel>
            <div>
              <Link to='/foodlog/today' className='button'>
                Start logging your rainbow
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
