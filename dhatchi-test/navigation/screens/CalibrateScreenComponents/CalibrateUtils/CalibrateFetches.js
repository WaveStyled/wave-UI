import { API, NODEPORT } from "../../../../context/API";

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

export function IDtoJSX(ids, a) {
  maps = [];
  ids.forEach(function (item, i) {
    var keys = item.filter((value) => value !== 0);
    //console.log(keys);
    const test = keys.map(function (value) {
      var val = a.find((element) => element.pieceid === value);
      return val;
    });
    maps.push(test);
  });
  return maps;
}
