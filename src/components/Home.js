import Container from '@mui/material/Container';
import '../styles/Home.scss';
import Carousel from './common/Carousel';
export default function Home() {
  return (
    <>
      <Container maxWidth='lg'>
        <h1>
          Eat the <span className='rainbow-animation'>Rainbow!</span>
        </h1>
        <h3>
          {' '}
          Forget about your 5 a day. It's a rainbow a day to keep the doctor
          away &#127752;
        </h3>
        <Carousel></Carousel>
      </Container>
    </>
  );
}
