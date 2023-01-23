import Chip from '@mui/material/Chip';

export default function FoodListItem({ foodItem, handleDelete, foodId }) {
  return (
    <Chip
      color='success'
      onDelete={handleDelete}
      label={foodItem}
      value={foodId}
    />
  );

  // <div>{foodItem}</div>;
}
