import React from 'react';

/**
 * Simple component with no state.
 *
 * @param {function} setDummy set the dummy state
 */
function getDummy(setDummy) {
  // fetch('http://localhost:3010/v0/dummy')
  fetch('/wardrobe')
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setDummy(json.message);
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
function Dummy() {
  const [dummy, setDummy] = React.useState('Click the button!');
  return (
    <div>
      <h3>
        Click button to connect to the Backend dummy endpoint</h3>
      <button
        aria-label='get dummy'
        onClick={(event) => {
          getDummy(setDummy);
        }}
      >
        Get Dummy
      </button>
      <p/>
      <label
        aria-label='dummy message'
      >
        {dummy}
      </label>
    </div>
  );
}

export default Dummy;
