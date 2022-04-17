import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';


let c;
/**
 * Simple component with no state.
 *
 * @param {function} setDummy set the dummy state
 */
function getDummy(setDummy) {
  // fetch('http://localhost:3010/v0/dummy')
  //fetch('/wardrobe')
  fetch('http://localhost:5000/wardrobe')
  // fetch('http://169.233.242.120/wardrobe')
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      console.log("RUNNIGN!!!\n");
      console.log(response);
      return response.json();
    })
    .then((json) => {
        c = json;
        console.log(json);
        setDummy(json);
    })
    .catch((error) => {
      setDummy(`ERROR: ${error.toString()}`);
    });
}


/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function Dummy(props) {
  const buttonClickHandler = () => {
    getDummy(setDummy);
    props.passData(dummy);
}

  const [dummy, setDummy] = useState({});
  return (
    <Text>
      <Text>Click button to connect to the Backend dummy endpoint</Text>
      <Button
        onPress={buttonClickHandler}
        title="Get Dummy">
      </Button>
    </Text>
  );
}

export default Dummy;