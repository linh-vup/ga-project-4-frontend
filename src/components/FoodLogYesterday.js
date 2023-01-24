import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import FoodListItem from './common/FoodListItem';
import FoodListItem2 from './common/FoodListItem2';
import FoodListDisplay from './common/FoodListDisplay';

import Container from '@mui/material/Container';

export default function FoodLogYesterday() {
  return (
    <>
      <Container maxWidth='lg'>
        <FoodListDisplay />
      </Container>
    </>
  );
}
