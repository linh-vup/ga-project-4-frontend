import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import FoodListItem from './common/FoodListItem';
import FoodListItem2 from './common/FoodListItem2';
import FoodListDisplay from './common/FoodListDisplay';

export default function FoodLogYesterday() {
  return <FoodListDisplay />;
}
