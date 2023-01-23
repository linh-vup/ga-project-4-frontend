import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import Search from './common/Search';
import FoodListItem from './common/FoodListItem';

export default function FoodLog() {
  // const [isUpdated, setIsUpdated] = useState(false);
  const [userDay, setUserDay] = useState({
    user: '',
    day_logged: '',
    foods_consumed: []
  });

  const [foods, setFoods] = useState([]);
  const [id, setId] = useState(null);
  // const [date, setDate] = useState('');
  // const [userId, setUserId] = useState();

  // useEffect(() => {
  //   API.POST(API.ENDPOINTS.singleUserDay(id)).then(({ data }) => {
  //     console.log(data);
  //     setUserDay({ ...userDay, user: id });
  //   }, []);
  // });

  useEffect(() => {
    setUserDay((userDay) => ({
      ...userDay,
      user: AUTH.getPayload().sub,
      day_logged: new Date().toJSON().slice(0, 10)
    }));
  }, []);

  console.log(userDay);

  useEffect(() => {
    if (id !== null) {
      API.GET(API.ENDPOINTS.singleUserDay(id))
        .then(({ data }) => {
          console.log(data);
          setFoods(data.foods_consumed);
        })
        .catch(({ message, response }) => console.error(message, response));
    }
  }, [id]);

  const handleSearchOnChange = (e, newValue) => {
    // const userIDFromSub = AUTH.getPayload().sub;
    // console.log('userIDFromSub:', userIDFromSub);
    // const date = new Date().toJSON().slice(0, 10);
    // console.log('date:', date);
    // console.log('event', newValue.id);

    setUserDay((userDay) => ({
      ...userDay,
      // user: userIDFromSub,
      // day_logged: date,
      foods_consumed: userDay.foods_consumed.push(newValue.id)
      // foods_consumed: [5]
    }));

    console.log('USER DAY', userDay);
    if (id === null) {
      API.POST(API.ENDPOINTS.createUserDay, userDay, API.getHeaders())
        .then(({ data }) => {
          setUserDay(data);
          console.log('USER DAY DATA TO CREATE', data);
          console.log('USER DAY DATA TO CREATE', data.id);
          setId(data.id);
        })
        .catch(({ message, response }) => console.error(message, response));
    } else {
      API.PUT(API.ENDPOINTS.singleUserDay(id), userDay, API.getHeaders())
        .then(({ data }) => {
          setUserDay(data);
          console.log('USER DAY DATA TO PUT', data);
          setFoods(data.foods_consumed);
        })
        .catch(({ message, response }) => console.error(message, response));
    }
  };

  if (userDay === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Search handleChange={handleSearchOnChange} />
      <p>Today I ate:</p>
      <ul>
        {foods?.map((food) => (
          <li key={food.name}>
            <FoodListItem foodItem={food.name} />
          </li>
        ))}
      </ul>
      {/* <p> logged in user ID : {userId}</p> */}
    </>
  );
}
