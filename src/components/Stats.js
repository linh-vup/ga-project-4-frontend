import { useState, useEffect } from 'react';
import { API } from '../lib/api';
// import { AUTH } from '../lib/auth';
import { Container, Grid } from '@mui/material';

import FoodListItem from './common/FoodListItem';

export default function Stats() {
  const [allUserDays, setAllUserDays] = useState([]);
  const [allFoods, setAllFoods] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllUserDays, API.getHeaders())
      .then(({ data }) => {
        setAllUserDays(data);

        const foodsConsumedInAllUserDays = data.map((userday) => {
          return userday.foods_consumed.map((food) => food);
        });

        const nestedFoods = [];
        for (let i = 0; i < foodsConsumedInAllUserDays.length; i++) {
          for (var j = 0; j < foodsConsumedInAllUserDays[i].length; j++) {
            nestedFoods.push(foodsConsumedInAllUserDays[i][j]);
          }
        }
        setAllFoods(nestedFoods);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  const distinctFoods = Array.from(new Set(allFoods?.map((food) => food.id)));
  distinctFoods.sort((foodId1, foodId2) => {
    return (
      allFoods.filter((food) => food.id === foodId2).length -
      allFoods.filter((food) => food.id === foodId1).length
    );
  });

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item md={8}>
            <h1>All the food you've logged</h1>
            {distinctFoods?.map((foodId) => {
              const foodsWithId = allFoods.filter((food) => food.id === foodId);
              const food = foodsWithId[0];
              return (
                <FoodListItem
                  name={food?.name}
                  className={`${food?.color?.slug} list-item`}
                  key={food?.id}
                  foodId={food?.id}
                  extraInfo={
                    <p id='times-eaten'>
                      Eaten <strong>{foodsWithId.length}</strong> times
                    </p>
                  }
                />
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
