import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

export default function FoodListItem({
  name,
  foodId,
  className,
  extraInfo,
  showDelete,
  onDeleteClicked,
  showAdd,
  onAddClicked
}) {
  return (
    <li className={className} value={foodId}>
      <div className='image-background'>
        <div className='image' />
      </div>
      <span className='label'>{name}</span>
      <span className='label-extra-info'>{extraInfo}</span>
      {showDelete ? (
        <div className='delete-button'>
          <HighlightOffIcon
            sx={{ fontSize: 40 }}
            onClick={onDeleteClicked}
            data-food-item-id={foodId}
          />
        </div>
      ) : (
        ''
      )}
      {showAdd ? (
        <div className='add-button'>
          <AddCircleOutline
            sx={{ fontSize: 40 }}
            onClick={onAddClicked}
            data-food-item-id={foodId}
          />
        </div>
      ) : (
        ''
      )}
    </li>
  );
}
