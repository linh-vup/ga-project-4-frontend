import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { useLocation, useParams } from 'react-router-dom';

import Search from './Search';
import FoodListItem2 from './FoodListItem2';
import ProgressBar from './ProgressBar';

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
  const [hasEatenRainbow, setHasEatenRainbow] = useState(false);
  const [redValue, setRedValue] = useState(0);
  const [yellowValue, setYellowValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const location = useLocation();
  const { id } = useParams();

  console.log({ foods, userDayId });

  let viewedDate = new Date();

  if (location.pathname === '/foodlog/yesterday') {
    viewedDate.setDate(viewedDate.getDate() - 1);
  } else if (location.pathname === `/foodlog/past/${id}`) {
    viewedDate.setDate(id.slice(8, 10));
    viewedDate.setMonth(id.slice(5, 7) - 1);
    viewedDate.setYear(id.slice(0, 4));
  } else if (location.pathname === '/foodlog/today') {
    viewedDate = new Date();
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

    API.GET(API.ENDPOINTS.getAllUserDAys, API.getHeaders())
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
          // foods_consumed: [...userDay.foods_consumed, newValue.id]
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

  const handleDelete = (e) => {};

  console.log({ foods });

  const userHasCompletedRainbow =
    foods.reduce((acc, curr) => {
      if (!acc.includes(curr.color.id)) {
        acc.push(curr.color.id);
      }
      return acc;
    }, []).length === colors.length;

  const progression = foods.reduce((acc, curr) => {
    if (!acc.includes(curr.color.slug)) {
      acc.push(curr.color.slug);
    }
    return acc;
  }, []);

  console.log(progression);

  // if (userHasCompletedRainbow) {
  //   setHasEatenRainbow(true);
  // }

  console.log({ userHasCompletedRainbow });

  // if (foods === null) {
  //   return (
  //     <p class='placeholder-wave'>
  //       <span class='placeholder col-12'></span>
  //     </p>
  //   );
  // }
  return (
    <>
      <ProgressBar redValue={20} yellowValue={20} greenValue={20} />
      <p> Log your food</p>
      <Search handleChange={handleSearchOnChange} />
      {userHasCompletedRainbow && <p>YAY YOU'VE EATEN THE RAINBOW</p>}
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
    </>
  );
}
