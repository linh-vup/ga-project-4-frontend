import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import moment from 'moment';

import FoodListItem from './FoodListItem';
import ProgressBar from './ProgressBar';
import Calendar from './Calendar';
import SocialSharebuttons from './SocialShareButtons';

import '../../styles/items.scss';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const userId = AUTH.getPayload().sub;
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

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllColors)
      .then(({ data }) => {
        setColors(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

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
          setFoods(userDay.foods_consumed);
          console.log('DATA RETURNED FROM GETALLUSERDAY CALL', data);
          console.log('USER DAY foods consumed', userDay.foods_consumed);
          setUserDayId(userDay.id);
          setIsUpdated(false);
        } else {
          setFoods([]);
          setUserDayId(null);
        }
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [userDayId, viewedDate, userId, isUpdated, id]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(searchQuery)).then(({ data }) => {
      if (searchQuery) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    });
  }, [searchQuery]);

  const addFood = (e) => {
    const foodId = parseInt(e.currentTarget.dataset.foodItemId);
    console.log('foodId to add1', e.currentTarget.dataset.foodItemId);
    if (userDayId === null) {
      console.log('POSTING');
      API.POST(
        API.ENDPOINTS.createUserDay,
        {
          ...userDay,
          foods_consumed: [foodId]
        },
        API.getHeaders()
      )
        .then(({ data }) => {
          setUserDay(data);
          setUserDayId(data.id);
        })
        .catch(({ message, response }) => console.error(message, response));
    } else {
      const foodsConsumedIds = userDay.foods_consumed.map((food) => food.id);
      API.PUT(
        API.ENDPOINTS.singleUserDay(userDayId),
        {
          ...userDay,
          foods_consumed: [...foodsConsumedIds, foodId]
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
    const listItemId = parseInt(e.currentTarget.dataset.foodItemId);
    const foodsConsumedIds = userDay.foods_consumed.map((food) => food.id);

    console.log('listItemId delete', e.currentTarget.dataset.foodItemId);

    const foodObjectIndexToRemove = foodsConsumedIds.findIndex(
      (foodId) => foodId === listItemId
    );
    if (foodObjectIndexToRemove === -1) {
      console.log('returned index -1');
      return;
    }
    const foodArrayToUpdate = [...foodsConsumedIds];
    foodArrayToUpdate.splice(foodObjectIndexToRemove, 1);

    console.log('foodArrayToUpdate', foodArrayToUpdate);

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
  console.log('allColorSlugs', allColorSlugs);
  console.log('consumedColorSlugs', consumedColorSlugs);

  const userHasCompletedRainbow =
    allColorSlugs.length === consumedColorSlugs.length;

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid item xs={12}>
          <ProgressBar
            allColors={allColorSlugs}
            consumedColors={consumedColorSlugs}
          />
          {userHasCompletedRainbow ? (
            <>
              <h1>Yay, you've eaten the rainbow</h1>
              <p className='share-text'>
                Flex it here:
                <span>
                  <SocialSharebuttons />
                </span>
              </p>
            </>
          ) : (
            <h1>Keep on going!</h1>
          )}

          <p>
            Your food log for {moment(viewedDate, 'YYYY-MM-DD').format('dddd')}
          </p>
        </Grid>
        <Grid item xs={12} md={5}>
          <h3>Add new</h3>
          <input
            type='text'
            id='search'
            placeholder='Search for food...'
            autoComplete='off'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul id='food-list-items'>
            {searchResults?.map((food) => (
              <FoodListItem
                name={food.name}
                className={`${food.color.slug} list-item`}
                key={`search-item-${food.id}`}
                foodId={food.id}
                showAdd={
                  !foods.find((consumedFood) => consumedFood.id === food.id)
                }
                onAddClicked={addFood}
              />
            ))}
          </ul>
          {!(location.pathname === '/foodlog/today') && (
            <>
              <h5>Check another day</h5>
              <Calendar />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <h3>Already logged</h3>
          {hasUserDayEntry ? (
            <ul id='food-list-items'>
              {foods?.map((food) => (
                <FoodListItem
                  name={food.name}
                  className={`${food.color.slug} list-item`}
                  key={`logged-item-${food.id}`}
                  foodId={food.id}
                  showDelete={true}
                  onDeleteClicked={handleDelete}
                />
              ))}
            </ul>
          ) : (
            <p>Nothing logged for this day</p>
          )}
        </Grid>
      </Grid>
    </>
  );
}
