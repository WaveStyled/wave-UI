import * as React from 'react';
import MainContainer from './navigation/MainContainer';

let c;
export const ClothesContext = React.createContext("Hello");
function getWardrobe(set){
  const requestOptions = {
    method: 'GET',
  };
  fetch('http://10.0.0.85:5000/wardrobe', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
      //return response.json();
    })
    .then((json)=> {
      //console.log(json);
      set(json);
    })
}
function App() {
  const [dummy, setDummy] = React.useState({});
  React.useEffect(() => {

    getWardrobe(setDummy);
  
  }, []);
  //getWardrobe(setDummy);
  //console.log(dummy);
  return (
    <ClothesContext.Provider value={dummy}>
      <MainContainer />
    </ClothesContext.Provider>
  );
}

export default App;
