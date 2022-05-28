/*
 Fetches.js contains all the reused API Fetches that are called throughout the program
  plus some extra helper functions
*/

// Imports
import { API, NODEPORT } from "../../context/API";

/*
Function: fetchEndCalibration

Purpose: Ends the Calibration Phase and sends the ratings and outfits taken
from calibrate to the backend

Input : send --> Array of 3 arrays holding the ratings, weather/occasion pairs, and outfits
        uid --> user id
*/

export function fetchEndCalibration(send, uid) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(send),
  };
  // End Calibrate, getFits(), reset index, set proper variables
  fetch(`http://${API}:${NODEPORT}/end_calibrate/${uid}`, requestOptions).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    }
  );
}

/*
Function: fetchRecommenderTrain

Purpose: Trains the recommender to prepare it for the recommend phase

Input : uid --> user id
*/

export function fetchRecommenderTrain(uid) {
  const trainOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch(
    `http://${API}:${NODEPORT}/recommender_train/${uid}/`,
    trainOptions
  ).then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response;
  });
}

/*
Function: getFits

Purpose: Starts the Calibration phase and loads a sequence of random outfits

Input : set --> function to set the fits states in useEffect()
        userid --> user ID
*/

export function getFits(set, userid) {
  fetch(`http://${API}:${NODEPORT}/start_calibrate/${userid}/5/`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      set(json);
    });
}

/*
Function: addItem

Purpose: Adds an item to the backend wardrobe

Input : props --> JSON data object with the necessary fields to send to the DB
        userid --> user ID
*/

export function addItem(props, userid) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };
  fetch(`http://${API}:${NODEPORT}/add/${userid}/`, requestOptions).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
    }
  );
  return true;
}

/*
Function: updateItem

Purpose: Update a single wardrobe item

Input : props --> JSON data object with the necessary fields to send to the DB
        userid --> user ID
*/

export function updateItem(props, userid) {
  const requestOptions2 = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };
  fetch(`http://${API}:${NODEPORT}/change/${userid}/`, requestOptions2).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
    }
  );
  return true;
}

/*
Function: getRecommendations

Purpose: Retrieve the recommendations for the user given a weather and occasion

Input : occasion --> the occasion string for the recommendations
        weather --> the weather string for the recommendations
        set --> function to set the fits states in useEffect()
        userid --> user ID
*/

export function getRecommendations(occasion, weather, set, userid) {
  return fetch(
    `http://${API}:${NODEPORT}/recommend/${userid}/${occasion}/${weather}`,
    {
      method: "PUT",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      console.log("BUH", json);
      set(json);
    });
}

/*
Function: OOTD

Purpose: set the outfit of the day

Input : data --> array of pieceids that represent the chosen outfit for the day
        userid --> user ID
*/

export function OOTD(data, userid) {
  const chooseOutfit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(`http://${API}:${NODEPORT}/OOTD/${userid}/`, chooseOutfit).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    }
  );
}

/*
Function: getOOTD

Purpose: Retrieve the outfit of the day

Input : set --> function to set the fits states in useEffect()
        userid --> user ID
*/

export function getOOTD(userid, set) {
  const props = {weather : "", occasion : "", date : ""};
  const chooseOutfit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const ootd = fetch(`http://${API}:${NODEPORT}/OOTD/${userid}/`, chooseOutfit).then(
    (response) => {
      if (!response.ok) {
        throw response;
      }
      console.log("RETURNS", response);
      return response.json();
    }
  ).then((json) => {
    set(json);
  });
}

/*
Function: IDtoJSX

Purpose: Convert an array of arrays of pieceids to JSON representations
  using the ClothesContext

Input : ids : Arrays of outfits to be converted
        context : the clothes context that stores item representations in the app
*/

export function IDtoJSX(ids, a) {
  maps = [];
  ids.forEach(function (item, i) {
    var keys = item.filter((value) => value !== 0);
    const test = keys.map(function (value) {
      var val = a.find((element) => element.pieceid === value);
      return val;
    });
    maps.push(test);
  });
  return maps;
}
