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
  const dateFormatted = new Date().toJSON().slice(0, 10);

  return (
    <>
      {/* <Box
        sx={{
          width: 500,
          height: 300
        }}
      > */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log('NEW DATE ON CHANGE', newDate.toJSON());
            const navTo = newDate.toJSON().slice(0, 10);
            navigate(`/foodlog/past/${navTo}`);
            console.log(new Date().toJSON());
          }}
        />
      </LocalizationProvider>
      {/* </Box> */}
      {/* <p>Date Today: {date}</p> */}
    </>
  );
}
