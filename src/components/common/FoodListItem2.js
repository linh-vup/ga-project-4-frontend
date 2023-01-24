import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

export default function FoodListItem2({ foodItem, onClick, value, className }) {
  return (
    <li className={className} onClick={onClick} value={value}>
      {foodItem}
    </li>
  );
}
