import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../lib/api';

import '../../styles/SearchBar.scss';

export default function Search({ handleChange }) {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllFoods)
      .then(({ data }) => {
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
              if (e.target.value !== '') {
                setQuery(e.target.value);
              } else {
                setFilteredFoods([]);
              }
            }}
            label='Search for food name'
          />
        )}
      />
    </Stack>
  );
}
