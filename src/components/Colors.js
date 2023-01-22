import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { API } from '../lib/api';

import Search from './common/Search';

export default function Colors() {
  const [colors, setColors] = useState(null);
  // const { id } = useParams();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllColors)
      .then(({ data }) => {
        setColors(data);
        console.log('COLORS DATA', data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  if (colors === null) {
    return <p>Loading</p>;
  }
  return (
    <>
      <p>This is the color page</p>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>{color.name}</li>
        ))}
      </ul>
    </>
  );
}
