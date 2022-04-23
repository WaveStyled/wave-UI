import * as React from 'react';
import MainContainer from './navigation/MainContainer';

function App() {
  const requestOptions = {
    method: 'GET',
  };
  fetch('http://192.168.1.185:5000/wardrobe')
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json()
      //return response.json();
    })
    .then((json)=> {
      console.log(json);
    })
  return (
    <MainContainer/>
  );
}

export default App;
