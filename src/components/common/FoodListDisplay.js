import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { useLocation, useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';
import Search from './Search';
import FoodListItem from './FoodListItem';
import ProgressBar from './ProgressBar';
import moment from 'moment';

import '../../styles/items.scss';
import { Typography } from '@mui/material';

export default function FoodListDisplay() {
  const [userDay, setUserDay] = useState({
    user: '',
    day_logged: '',
    foods_consumed: []
  });

  const [userDayId, setUserDayId] = useState(null);
  const [foods, setFoods] = useState([]);
  const [colors, setColors] = useState([]);
  const [hasUserDayEntry, setHasUserDayEntry] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasEatenRainbow, setHasEatenRainbow] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  console.log({ foods, userDayId });

  let viewedDate = new Date();

  if (location.pathname === '/foodlog/today') {
    viewedDate = new Date();
  } else if (location.pathname === '/foodlog/yesterday') {
    viewedDate.setDate(viewedDate.getDate() - 1);
  } else if (location.pathname === `/foodlog/past/${id}`) {
    viewedDate.setDate(id.slice(8, 10));
    viewedDate.setMonth(id.slice(5, 7) - 1);
    viewedDate.setYear(id.slice(0, 4));
  }
  viewedDate = viewedDate.toJSON().slice(0, 10);

  const userId = AUTH.getPayload().sub;

  useEffect(() => {
    if (foods.length) {
      API.GET(API.ENDPOINTS.getAllColors)
        .then(({ data }) => {
          setColors(data);
        })
        .catch(({ message, response }) => console.error(message, response));
    }
  }, [foods.length]);

  useEffect(() => {
    setUserDay((userDay) => ({
      ...userDay,
      user: AUTH.getPayload().sub,
      day_logged: viewedDate
    }));

    API.GET(API.ENDPOINTS.getAllUserDays, API.getHeaders())
      .then(({ data }) => {
        const userDay = data.find((day) => day.day_logged === viewedDate);
        if (userDay) {
          setHasUserDayEntry(true);
          setUserDay(userDay);
          setUserDayId(userDay.id);

          API.GET(API.ENDPOINTS.singleUserDay(userDay.id), API.getHeaders())
            .then(({ data }) => {
              setFoods(data.foods_consumed);
              setIsUpdated(false);
            })
            .catch(({ message, response }) => console.error(message, response));
        } else {
          setHasEatenRainbow(false);
          setFoods([]);
          setUserDayId(null);
        }
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [userDayId, viewedDate, userId, isUpdated, id]);

  const handleSearchOnChange = (e, newValue) => {
    console.log({ newValue, userDay });

    if (userDayId === null) {
      console.log('POSTING');
      API.POST(
        API.ENDPOINTS.createUserDay,
        {
          ...userDay,
          foods_consumed: [newValue.id]
        },
        API.getHeaders()
      )
        .then(({ data }) => {
          setUserDay(data);
          setUserDayId(data.id);
        })
        .catch(({ message, response }) => console.error(message, response));
    } else {
      console.log('UPDATING');
      API.PUT(
        API.ENDPOINTS.singleUserDay(userDayId),
        {
          ...userDay,
          foods_consumed: [...userDay.foods_consumed, newValue.id]
        },
        API.getHeaders()
      )
        .then(({ data }) => {
          setUserDay(data);
          setFoods(data.foods_consumed);
          setIsUpdated(true);
        })
        .catch(({ message, response }) => console.error(message, response));
    }
  };

  const handleDelete = (e) => {
    const listItemId = parseInt(e.target.dataset.foodItemId);
    const foodObjectIndexToRemove = userDay?.foods_consumed.findIndex(
      (food) => food === listItemId
    );
    if (foodObjectIndexToRemove === -1) {
      console.log('returned index -1');
      return;
    }
    const foodArrayToUpdate = [...userDay.foods_consumed];
    foodArrayToUpdate.splice(foodObjectIndexToRemove, 1);

    API.PUT(
      API.ENDPOINTS.singleUserDay(userDayId),
      {
        ...userDay,
        foods_consumed: [...foodArrayToUpdate]
      },
      API.getHeaders()
    )
      .then(({ data }) => {
        setUserDay(data);
        setFoods(data.foods_consumed);
        setIsUpdated(true);
      })
      .catch(({ message, response }) => console.error(message, response));
  };

  const allColorSlugs = colors.map((color) => color.slug);
  const consumedColorSlugs = Array.from(
    new Set(foods.map((food) => food.color.slug))
  );

  const userHasCompletedRainbow =
    allColorSlugs.length === consumedColorSlugs.length;

  return (
    <>
      <Grid container spacing={2}>
        <ProgressBar
          allColors={allColorSlugs}
          consumedColors={consumedColorSlugs}
        />
        <Grid item xs={12}>
          {userHasCompletedRainbow ? (
            <h1>Yay, you've eaten the rainbow</h1>
          ) : (
            <h1>Keep on going!</h1>
          )}

          <p>
            Your food log for {moment(viewedDate, 'YYYY-MM-DD').format('dddd')}
          </p>
        </Grid>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item xs={12} sm={12} md={6}>
            {hasUserDayEntry ? (
              <ul id='food-list-items'>
                {foods?.map((food) => (
                  <FoodListItem
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
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Search handleChange={handleSearchOnChange} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
