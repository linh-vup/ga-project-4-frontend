import FoodListDisplay from './common/FoodListDisplay';

import Container from '@mui/material/Container';

export default function FoodLog() {
  return (
    <>
      <>
        <Container maxWidth='lg' sx={{ display: 'flex' }}>
          <FoodListDisplay />
        </Container>
      </>
    </>
  );
}
