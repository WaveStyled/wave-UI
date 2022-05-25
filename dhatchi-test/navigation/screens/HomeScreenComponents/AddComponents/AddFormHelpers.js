/*
Component: AddFormHelper
Purpose: Contains functions used to convert selected occasions and weather in add scrren to a representation prepared for sending to node. 
*/

// What inicies in the array map to what occasion
const occasion_mapping = {
  FF: 0,
  SF: 1,
  CS: 2,
  WK: 3,
  BD: 4,
  LZ: 5,
};
// What indicies in the the array map to what weather type
const weather_mapping = {
  C: 0,
  H: 1,
  R: 2,
  N: 3,
  T: 4,
};

/*
Function: propstoweather
Purpose: Given the selections from the weather drop down picker the function converts the props to a list of characters representing the selected weathers
Input: props from weather dropdown picker in add screen
Output: List of chars that map to chosen weathers
*/
export function propstoweather(p) {
  // Define characters used to represent weathers. Index is important
  const weather_map_strings = ["C", "H", "R", "N", "T"];
  // Map props to list of characters per weather, false if particular weather is not specified
  w = p.map(function (value, index) {
    if (value) {
      return weather_map_strings[index];
    } else {
      return false;
    }
  });
  // Returns list of chars with false(not selected) weathers removed
  return w.filter((element) => element !== false);
}

/*
Function: propstooccasion
Purpose: Given the selections from the weather drop down picker the function converts the props to a list of characters representing the selected weathers
Input: props from occasion deop down picker
Outout: List of strings that map to chosen occasions
*/
export function propstooccasion(p) {
  //Define strings used to represent occasions
  const occ_map = ["FF", "SF", "CS", "WK", "BD", "LZ"];
  // Map props to a list of strings where index is used to find what occasion string should be added to list. 
  o = p.map(function (value, index) {
    if (value) {
      return occ_map[index];
    } else {
      return false;
    }
  });
  // Remove faleses from list and returnd
  return o.filter((element) => element !== false);
}
/*
Function: mapOccasionToBin
Purpose: Converts the list of strings to an bit array with length 6(there are 6 occasions). The bits are flipped to 1 if the occasion that matches that index is in the list of strings.
Input: List of strings with chosen occasions
Output: Bit array with mappings as to what occasions are selected and what ones are not
*/
export function mapOccasionToBin(ocs) {
  // Create array of 0's
  (arr = []).length = 6;
  arr.fill(0);
  // [0,0,0,0,0,0] -> [1,1,0,1,1,0] Based on occasions mappings. Each index represents a particular occasion. 
  for (var i = 0; i < ocs.length; i++) {
    arr[occasion_mapping[ocs[i]]] = 1;
  }
  return arr;
}
/*
Function: mapWeatherToBin
Purpose: Converts the list of chars to an bit array with length 5(there are 5 weather types). The bits are flipped to 1 if the weather that matches that index is in the list of strings.
Input: List of strings with chosen weathers
Output: Bit array with mappings as to what weathers are selected and what ones are not
*/
export function mapWeatherToBin(we) {
  // Create array of 0's
  (arr = []).length = 5;
  arr.fill(0);
  // [0,0,0,0,0,0] -> [1,1,0,1,1,0] Based on weather mappings. Each index represents a particular occasion. 
  for (var i = 0; i < we.length; i++) {
    arr[weather_mapping[we[i]]] = 1;
  }
  return arr;
}
