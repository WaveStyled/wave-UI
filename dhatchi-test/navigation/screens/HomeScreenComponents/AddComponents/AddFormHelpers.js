const occasion_mapping = {
  FF: 0,
  SF: 1,
  CS: 2,
  WK: 3,
  BD: 4,
  LZ: 5,
};

const weather_mapping = {
  C: 0,
  H: 1,
  R: 2,
  N: 3,
  T: 4,
};

export function propstoweather(p) {
  const weat_map = ["C", "H", "R", "N", "T"];
  w = p.map(function (value, index) {
    if (value) {
      return weat_map[index];
    } else {
      return false;
    }
  });
  return w.filter((element) => element !== false);
}

export function propstooccasion(p) {
  const occ_map = ["FF", "SF", "CS", "WK", "BD", "LZ"];
  o = p.map(function (value, index) {
    if (value) {
      return occ_map[index];
    } else {
      return false;
    }
  });
  return o.filter((element) => element !== false);
}

export function mapOccasionToBin(ocs) {
  (arr = []).length = occasion.length;
  arr.fill(0);
  for (var i = 0; i < ocs.length; i++) {
    arr[occasion_mapping[ocs[i]]] = 1;
  }
  return arr;
}

export function mapWeatherToBin(we) {
  (arr = []).length = weather.length;
  arr.fill(0);
  for (var i = 0; i < we.length; i++) {
    arr[weather_mapping[we[i]]] = 1;
  }
  return arr;
}
