import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { useLocation } from 'react-router-dom';
import FoodListItem2 from './FoodListItem2';

export default function FoodListDisplay() {
  const [userDayDate, setUserDayDate] = useState();
  const [userDayId, setUserDayId] = useState();
  const [foods, setFoods] = useState(null);
  const [hasUserDayEntry, setHasUserDayEntry] = useState(false);

  const location = useLocation();
  console.log(location);

  let viewedDate = new Date();
  console.log('viewedDate 1', viewedDate);
  if (location.pathname === '/foodlog/yesterday') {
    viewedDate.setDate(viewedDate.getDate() - 1);
  } else if (location.pathname === '/foodlog/past') {
    viewedDate.setDate(viewedDate.getDate() - 3);
  }
  viewedDate = viewedDate.toJSON().slice(0, 10);
  console.log('viewedDate 2', viewedDate);

  const userId = AUTH.getPayload().sub;
  console.log('USER ID', userId);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllUserDAys)
      .then(({ data }) => {
        console.log('DATA FROM GET ALL USER DAYS', data);
        const userDay = data.find(
          (day) => day.day_logged === viewedDate && day.user === userId
        );
        if (userDay) {
          console.log('FOUND USER DATA True', userDay);
          setHasUserDayEntry(true);
          setUserDayDate(userDay);
          console.log('USER DAY DATA FROM GETALLUSER DAY CALL', userDay);
          setUserDayId(userDay.id);

          API.GET(API.ENDPOINTS.singleUserDay(userDay.id))
            .then(({ data }) => {
              console.log(data);
              setFoods(data.foods_consumed);
              console.log('FOOD LOG FROM SINGlE USERDAY', data.foods_consumed);
            })
            .catch(({ message, response }) => console.error(message, response));
        } else {
          return;
        }
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [userDayId, viewedDate, userId]);

  const handleDelete = (e, value) => {
    console.info('You clicked the delete icon.');
    console.log('You clicked', e.target.value);
    console.log('Value', value);
  };

  return (
    <>
      <p>food log for {viewedDate}</p>
      {hasUserDayEntry ? (
        foods?.map((food) => (
          <FoodListItem2
            foodItem={food.name}
            onClick={handleDelete}
            value={food.id}
          />
        ))
      ) : (
        <p>Nothing logged for this day</p>
      )}
    </>
  );
}
