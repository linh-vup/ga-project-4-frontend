import Calendar from './common/Calendar';
import FoodListDisplay from './common/FoodListDisplay';

import Container from '@mui/material/Container';

export default function PastFoodLog() {
  return (
    <>
      <Container maxWidth='lg'>
        <FoodListDisplay />
      </Container>
    </>
  );
}
