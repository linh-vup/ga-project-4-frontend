import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../lib/api';

export default function Search({ handleChange }) {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllFoods)
      .then(({ data }) => {
        console.log('FOODS DATA', data);
        setFoods(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(query)).then(({ data }) => {
      if (query) {
        // setIsOpen(true);
        setFilteredFoods(data);
      }
    });
  }, [query]);

  // console.log('Product Data from Search2', foods);
  // console.log('Filtered Product Data from Search2', filteredFoods);

  // useEffect(() => {
  //   const clearup = () => {
  //     // setIsOpen(false);
  //     setQuery('');
  //     setFilteredFoods([]);
  //   };

  //   return clearup;
  // }, []);

  return (
    <Stack spacing={2} sx={{ width: 600 }}>
      <Autocomplete
        options={query ? filteredFoods : foods}
        getOptionLabel={(food) => food.name}
        onChange={handleChange}
        // Don't use build in matching logic, as it just filters through food names, but we use API query to manually control autocomplete list
        filterOptions={(food) => food}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              console.log('User is Typing', e.target.value);
              if (e.target.value !== '') {
                setQuery(e.target.value);
              } else {
                setFilteredFoods([]);
              }
            }}
            label='Search for food name or description'
          />
        )}
      />
    </Stack>
  );
}
