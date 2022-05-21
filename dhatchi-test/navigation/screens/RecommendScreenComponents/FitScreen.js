import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Swiper from "react-native-deck-swiper";
import { Transitioning } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ClothesContext } from "../../../context/AppContext";
import { UserContext } from "../../../context/UserIDContext";
import { transition } from "../../utils/SwiperTransition";
import {
  IDtoJSX,
  fetchEndCalibration,
  fetchRecommenderTrain,
  OOTD,
  getRecommendations,
} from "../../utils/Fetches";
import { Card } from "../../utils/OutfitRender";

const { width } = Dimensions.get("window");

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

const swiperRef = React.createRef();
const transitionRef = React.createRef();

export default function App({ route, navigation }) {
  const a = React.useContext(ClothesContext);
  const uid = React.useContext(UserContext);

  const [index, setIndex] = React.useState(0);
  const [fits, setFits] = React.useState(route.params.initial);
  const [likes, setLikes] = React.useState([]);

  const [curWeather] = React.useState(route.params.weather);
  const [curOccasion] = React.useState(route.params.occasion);

  const [change, setChange] = React.useState(false); // this determines whether the fits need to be fetched again
  const [testing, setOutfits] = React.useState(
    IDtoJSX(route.params.initial, a)
  ); // this stores the JSX objects
  const [loaded, setLoad] = React.useState(true);

  React.useEffect(() => {
    if (!loaded) {
      getRecommendations(curOccasion, curWeather, setFits, uid);
    } else {
      setLoad(false);
    }
  }, [change]);

  React.useEffect(() => {
    if (!loaded) {
      maps = [];
      fits.forEach(function (item, i) {
        var ids = item.filter((value) => value !== 0);
        const test = ids.map(function (value) {
          var val = a.find((element) => element.pieceid === value);
          return val;
        });
        maps.push(test);
      });
      setOutfits(maps);
    }
  }, [fits, change]); // updates only when a new fetch comes

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Text style={styles.panelButtonTitle2}>{curWeather}</Text>
      ),
      headerLeft: () => (
        <Text style={styles.panelButtonTitle2}>{curOccasion}</Text>
      ),
    });
  });

  const refreshBuffer = () => {
    setChange(!change);
    setLoad(false);
    setIndex(0);
    setLikes([]);
    var send = [];
    send.push(likes.slice(0, index));
    send.push(fits.slice(0, index));

    var w_o_vals = fits.map((_) => [curOccasion, curWeather]);
    send.push(w_o_vals.slice(0, index));

    fetchEndCalibration(send, uid);
  };

  const onSwipedLeft = () => {
    transitionRef.current.animateNextTransition();
    console.log("Left");

    var x = likes;
    x.push(0);
    setLikes(x);
    setIndex((index + 1) % testing.length);
    if (index + 1 == testing.length) {
      refreshBuffer();
    }
  };

  const onSwipedRight = () => {
    transitionRef.current.animateNextTransition();
    console.log("Right");

    setIndex((index + 1) % testing.length);
    var x = likes;
    x.push(1);
    setLikes(x);
    if (index + 1 == testing.length) {
      refreshBuffer();
    }
  };

  const Finish = () => {
    var send = [];
    send.push(likes.slice(0, index));
    send.push(fits.slice(0, index));

    var w_o_vals = fits.map(function (_) {
      return [curOccasion, curWeather];
    });
    send.push(w_o_vals.slice(0, index));

    fetchEndCalibration(send, uid);
    fetchRecommenderTrain(uid);

    navigation.navigate("RecommendMain");
  };

  const chooseOutfit = () => {
    // outfit selection logic here
    var data = {
      outfit: fits[index],
      weather: curWeather,
      occasion: curOccasion,
    };
    OOTD(data, uid);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons
        name="crop-square"
        size={width}
        color={colors.blue}
        style={{
          opacity: 0.05,
          transform: [{ rotate: "45deg" }, { scale: 1.6 }],
          position: "absolute",
          left: -15,
          top: 30,
        }}
      />
      <StatusBar hidden={true} />
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={testing}
          renderCard={(card) => <Card card={card} />}
          infinite
          backgroundColor={"transparent"}
          onSwipedLeft={() => {
            onSwipedLeft();
          }}
          onSwipedRight={() => {
            onSwipedRight();
          }}
          cardVerticalMargin={50}
          stackSize={2}
          stackScale={5}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          stackAnimationTension={100}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: colors.red,
                  borderColor: colors.red,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: colors.blue,
                  borderColor: colors.blue,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          {/* <CardDetails index={index} /> */}
        </Transitioning.View>
        <View style={styles.bottomContainerButtons}>
          <MaterialCommunityIcons.Button
            name="close"
            size={50}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.red}
            onPress={() => {
              swiperRef.current.swipeLeft();
            }}
          />
          <MaterialCommunityIcons.Button
            name="hanger"
            size={50}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.blue}
            onPress={() => {
              chooseOutfit();
            }}
          />
          <MaterialCommunityIcons.Button
            name="check"
            size={50}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.green}
            onPress={() => {
              swiperRef.current.swipeRight();
            }}
          />
        </View>
        <View style={styles.bottomContainerButtons}>
          <Text style={styles.text}>Dislike</Text>

          <Text>Outfit of the Day</Text>

          <Text>Like</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={Finish}
            disabled={false}
          >
            <Text style={styles.panelButtonTitle}>
              Exit and Refine Recommendations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
  },
  swiperContainer: {
    flex: 0.55,
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
  price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
  item: {
    backgroundColor: "#FFF",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "80%",
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
  },
  panelButtonTitle2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    width: "60%",
    justifyContent: "center",
  },
});
