import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import FoodListItem from './common/FoodListItem';

export default function FoodLogYesterday() {
  const [yesterdaysUserDay, setYesterdaysUserDay] = useState();
  const [userDayId, setUserDayId] = useState();
  const [foods, setFoods] = useState(null);

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toJSON().slice(0, 10);
  console.log('YESTERDAY', yesterday);
  // console.log('YESTERDAY', trimmedY);

  const userId = AUTH.getPayload().sub;
  console.log('USER ID', userId);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllUserDAys)
      .then(({ data }) => {
        console.log('DATA FROM GET ALL USER DAYS', data);
        const userDay = data.find(
          (day) => day.day_logged === yesterday && day.user === userId
        );
        console.log('FOUND USER DATA', userDay);
        setYesterdaysUserDay(userDay);
        console.log('YESERDAY USER DAY DATA FROM GETALLUSER DAY CALL', userDay);
        setUserDayId(userDay.id);

        API.GET(API.ENDPOINTS.singleUserDay(userDay.id))
          .then(({ data }) => {
            console.log(data);
            setFoods(data.foods_consumed);
            console.log('FOOD LOG FROM SINGE USERDAY', data.foods_consumed);
          })
          .catch(({ message, response }) => console.error(message, response));
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  // useEffect(() => {
  //   API.GET(API.ENDPOINTS.singleUserDay(userDayId))
  //     .then(({ data }) => {
  //       console.log(data);
  //       setFoods(data.foods_consumed);
  //       console.log('FOOD LOG FROM SINGE USERDAY', data.foods_consumed);
  //     })
  //     .catch(({ message, response }) => console.error(message, response));
  // }, []);

  if (yesterdaysUserDay === null) {
    return <p>Loading</p>;
  }
  return (
    <>
      <p>yesterday's food console log</p>
      {foods?.map((food) => (
        <FoodListItem foodItem={food.name} />
      ))}
    </>
  );
}
