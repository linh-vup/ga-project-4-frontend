import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { Container } from '@mui/system';

import FoodListItem from './common/FoodListItem';

export default function Stats() {
  const [allUserDays, setAllUserDays] = useState([]);
  const [allFoods, setAllFoods] = useState(null);
  const [dateRange, setDateRange] = useState();
  const userId = AUTH.getPayload().sub;

  let today = new Date();
  let todayToAmend = new Date(today);
  let dateLastWeek = new Date(todayToAmend.setDate(todayToAmend.getDate() - 7));

  today = today.toJSON().slice(0, 10);
  dateLastWeek = dateLastWeek.toJSON().slice(0, 10);

  function getdateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate).toJSON().slice(0, 10));
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray;
  }

  const dates = getdateRange(dateLastWeek, today);
  console.log(dates);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllUserDays, API.getHeaders())
      .then(({ data }) => {
        console.log('DATA FROM GET ALL USER DAYS', data);
        setAllUserDays(data);

        const foodsConsumedInAllUserDays = data.map((userday) => {
          return userday.foods_consumed.map((food) => food);
        });
        console.log({ foods: foodsConsumedInAllUserDays });

        const nestedFoods = [];
        for (let i = 0; i < foodsConsumedInAllUserDays.length; i++) {
          for (var j = 0; j < foodsConsumedInAllUserDays[i].length; j++) {
            nestedFoods.push(foodsConsumedInAllUserDays[i][j]);
          }
        }
        console.log('NESTED FOODS', nestedFoods);
        setAllFoods(nestedFoods);
        console.log('ALL FOODS FROM CALL ', nestedFoods);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  const individualFoods = allFoods?.reduce((accumulator, current) => {
    if (!accumulator.find((item) => item.id === current.id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  console.log('INDI FOOD', individualFoods);

  const numberOfTimesFoodsEaten = allFoods?.reduce(
    (acc, value) => ({
      ...acc,
      [value.name]: (acc[value.name] || 0) + 1
    }),
    {}
  );

  console.log({ numberOfTimesFoodsEaten });

  return (
    <>
      <Container maxWidth='lg'>
        <p>All The Food's You've Logged</p>
        {individualFoods?.map((food) => (
          <FoodListItem
            foodItem={food?.name}
            className={`${food?.color?.slug} list-item`}
            key={food?.id}
            value={food?.id}
            extraInfo={
              Object.keys(numberOfTimesFoodsEaten === food.name) && <p>Hello</p>
            }
          />
        ))}
      </Container>
    </>
  );
}
