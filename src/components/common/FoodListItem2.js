import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

export default function FoodListItem2({ foodItem, onClick, value }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea onClick={onClick} value={value}>
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {foodItem}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  // <div>{foodItem}</div>;
}
