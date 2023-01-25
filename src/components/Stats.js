import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function Stats() {
  const [allUserDays, setAllUserDays] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
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
        console.log('DATE FROM GET ALL USER DAYS', data);
        setAllUserDays(data);
        setAllFoods(data.foods_consumed);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  return (
    <>
      <p>Stats page</p>
    </>
  );
}
