import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

export default function StaticDatePickerLandscape() {
  // const [value, setValue] = useState(dayjs('2022-04-07'));

  // const [date, setDate] = useState(dayjs('2022-04-07'));
  const [date, setDate] = useState(dayjs(new Date()));
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
            console.log(newDate.toJSON());
            console.log(new Date().toJSON());
          }}
        />
      </LocalizationProvider>
      {/* </Box> */}
      {/* <p>Date Today: {date}</p> */}
    </>
  );
}
