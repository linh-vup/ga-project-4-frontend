import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { useLocation } from 'react-router-dom';

import Search from './Search';
import FoodListItem2 from './FoodListItem2';

import '../../styles/items.scss';
import { color } from '@mui/system';

export default function FoodListDisplay() {
  const [userDay, setUserDay] = useState({
    user: '',
    day_logged: '',
    foods_consumed: []
  });

  const [userDayId, setUserDayId] = useState(null);
  const [foods, setFoods] = useState(null);
  const [colors, setColors] = useState(null);
  const [hasUserDayEntry, setHasUserDayEntry] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasEatenRainbow, setHasEatenRainbow] = useState(false);
  const location = useLocation();
  // console.log(location);

  let viewedDate = new Date();
  // console.log('viewedDate 1', viewedDate);
  if (location.pathname === '/foodlog/yesterday') {
    viewedDate.setDate(viewedDate.getDate() - 1);
  } else if (location.pathname === '/foodlog/past') {
    viewedDate.setDate(viewedDate.getDate() - 3);
  } else if (location.pathname === '/foodlog/today') {
    viewedDate.setDate(new Date());
  }
  viewedDate = viewedDate.toJSON().slice(0, 10);
  // console.log('viewedDate 2', viewedDate);

  const userId = AUTH.getPayload().sub;
  // console.log('USER ID', userId);
  // console.log('USER DAY ID 1', userDayId);

  // useEffect(() => {
  //   setUserDay((userDay) => ({
  //     ...userDay,
  //     user: AUTH.getPayload().sub,
  //     day_logged: viewedDate
  //   }));
  // }, [viewedDate]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllColors)
      .then(({ data }) => {
        setColors(data);
        console.log('COLORS DATA', data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  useEffect(() => {
    setUserDay((userDay) => ({
      ...userDay,
      user: AUTH.getPayload().sub,
      day_logged: viewedDate
    }));
    API.GET(API.ENDPOINTS.getAllUserDAys, API.getHeaders())
      .then(({ data }) => {
        console.log('DATA FROM GET ALL USER DAYS', data);
        const userDay = data.find((day) => day.day_logged === viewedDate);
        if (userDay) {
          console.log('FOUND USER DATA', userDay);
          setHasUserDayEntry(true);
          setUserDay(userDay);
          console.log('USER DAY DATA FROM GETALLUSER DAY CALL', userDay);
          setUserDayId(userDay.id);

          API.GET(API.ENDPOINTS.singleUserDay(userDay.id), API.getHeaders())
            .then(({ data }) => {
              console.log(data);
              setFoods(data.foods_consumed);
              console.log('FOOD LOG FROM SINGlE USERDAY', data.foods_consumed);
              setIsUpdated(false);
              declareRainBowEaten();
            })
            .catch(({ message, response }) => console.error(message, response));
        } else {
          return;
        }
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [userDayId, viewedDate, userId, isUpdated]);

  const handleSearchOnChange = (e, newValue) => {
    setUserDay((userDay) => ({
      ...userDay,
      foods_consumed: userDay.foods_consumed.push(newValue.id)
    }));

    console.log('USER DAY', userDay);
    console.log('ID IN ONCHANGE', userDayId);
    if (userDayId === null) {
      API.POST(API.ENDPOINTS.createUserDay, userDay, API.getHeaders())
        .then(({ data }) => {
          setUserDay(data);
          console.log('USER DAY DATA TO CREATE', data);
          console.log('USER DAY DATA TO CREATE', data.userDayId);
          setUserDayId(data.id);
        })
        .catch(({ message, response }) => console.error(message, response));
    } else {
      API.PUT(API.ENDPOINTS.singleUserDay(userDayId), userDay, API.getHeaders())
        .then(({ data }) => {
          setUserDay(data);
          console.log('USER DAY DATA TO PUT', data);
          setFoods(data.foods_consumed);
          setIsUpdated(true);
        })
        .catch(({ message, response }) => console.error(message, response));
    }
  };

  const handleDelete = (e) => {
    console.log('value', e.target.value);
    console.info('You clicked the delete icon.');
    // console.log('You clicked', value);
    // console.log('Value', key);
  };

  const declareRainBowEaten = () => {
    console.log('DECLARERAINBOW FUNCTION IS RUNNING');
    console.log('COLORS FROM INSIDE DCLETR', colors);
    console.log('FOODs FROM INSIDE DCLETR', foods);
    const isETRTrue = colors.every((i) =>
      foods?.map((food) => food?.color?.id).includes(i.id)
    );
    console.log('ETR BOOL VAL', isETRTrue);
    if (isETRTrue) {
      console.log('declare rainbow');
      setHasEatenRainbow(true);
    }
  };
  if (foods === null) {
    return <p>Loading</p>;
  }
  return (
    <>
      <Search handleChange={handleSearchOnChange} />
      <p>food log for {viewedDate}</p>
      {hasUserDayEntry ? (
        <ul>
          {foods?.map((food) => (
            <FoodListItem2
              foodItem={food?.name}
              onClick={handleDelete}
              className={`${food?.color?.slug} list-item`}
              key={food?.id}
              value={food?.id}
            />
          ))}
        </ul>
      ) : (
        <p>Nothing logged for this day</p>
      )}
      {hasEatenRainbow && <p>YAY YOU'VE EATEN THE RAINBOW</p>}
    </>
  );
}