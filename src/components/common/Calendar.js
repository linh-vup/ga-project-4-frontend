import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

export default function StaticDatePickerLandscape() {
  // const [value, setValue] = useState(dayjs('2022-04-07'));

  // const [date, setDate] = useState(dayjs('2022-04-07'));
  const { id } = useParams();
  const [date, setDate] = useState(dayjs(id));
  const navigate = useNavigate();


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => {
            setDate(newDate);
            const navTo = newDate.toJSON().slice(0, 10);
            navigate(`/foodlog/past/${navTo}`);
          }}
        />
      </LocalizationProvider>
    </>
  );
}
