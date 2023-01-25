import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function FoodListItem({ foodItem, onClick, value, className }) {
  return (
    <li className={className} value={value}>
      <div className='image-background'>
        <div className='image' />
      </div>
      <span className='label'>{foodItem}</span>
      <div className='remove-button'>
        <HighlightOffIcon
          sx={{ fontSize: 40 }}
          onClick={onClick}
          data-food-item-id={value}
        />
      </div>
    </li>
  );
}
