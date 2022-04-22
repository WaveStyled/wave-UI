import * as React from 'react';
import MainContainer from './navigation/MainContainer';

function App() {
  fetch('http://localhost:5000/wardrobe')
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      console.log("RUNNIGN!!!\n");
      console.log(response.json());
      //return response.json();
    })
  return (
    <MainContainer/>
  );
}

export default App;
