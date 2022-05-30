import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    OpenSans: require('./OpenSans-Regular.ttf'),
  });