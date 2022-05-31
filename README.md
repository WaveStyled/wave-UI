## wave-UI

React-Native based App that serves as the front-end for WaveStyled: Clothing Recommendation App. The app has been tested extensively on IOS devices. 

### Requirements

- Need Expo CLI installed on machine and Expo go installed on mobile(or simulator installed).
  
  - Currenly ``iOS`` is only supported

- Follow installation guides for other components

- In `context/API.js`, change the value for `const API` to the local IP address of the machine that's running

### How to run

- Run `npm install` or `yarn install` in the directory(must have nodejs installed).

- Open **3** seperate terminals:
  
  - In `wave-server` run `node index.js`
  
  - In `wave-recommender` run ```python3 -m Link.py```

- Run command `(sudo) expo start` or `yarn start` to generate a QR code

- Scan QR code on the App and app will build and load. 
