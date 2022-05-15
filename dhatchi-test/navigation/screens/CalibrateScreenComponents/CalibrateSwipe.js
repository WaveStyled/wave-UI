import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import data from "./data";
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition, set } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API, NODEPORT } from "../../../context/API";
import { ClothesContext } from "../../../context/AppContext";
const { width } = Dimensions.get("window");

const stackSize = 4;
const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};
const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

function getFits(set, old_state) {
 fetch(`http://${API}:${NODEPORT}/start_calibrate/123/5/`, {
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

function IDtoJSX(ids, a) {
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

export default function App({ route, navigation }) {
  const a = React.useContext(ClothesContext);

  const [index, setIndex] = React.useState(0);
  const [fits, setFits] = React.useState(route.params.initial);
  const [likes, setLikes] = React.useState([]);

  const [curWeather, setWeather] = React.useState("test");
  const [curOccasion, setOccasion] = React.useState("");
  const [change, setChange] = React.useState(false); // this determines whether the fits need to be fetched again
  const [testing, setOutfits] = React.useState(
    IDtoJSX(route.params.initial[0], a)
  ); // this stores the JSX objects
  const [loaded, setLoad] = React.useState(true);

  React.useEffect(() => {
    console.log("HAPPENS");
    if (!loaded) {
      console.log("UPDATE");
      getFits(setFits, fits);
    } else {
      console.log("HERE");
      setLoad(false);
    }
  }, [change]);

  React.useEffect(() => {
    setOccasion(fits[1][index][0]);
    setWeather(fits[1][index][1]);
  }, [index, fits[0]]); // updates these fields only when fits[0] has fnished init (NOTE this has to be in a separate hook)

  React.useEffect(() => {
    if (!loaded) {
      maps = [];
      fits[0].forEach(function (item, i) {
        var ids = item.filter((value) => value !== 0);
        const test = ids.map(function (value) {
          var val = a.find((element) => element.pieceid === value);
          return val;
        });
        maps.push(test);
      });
      setOutfits(maps);
    }
  }, [fits[0], change]); // updates only when a new fetch comes

  console.log(fits[0]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => <Text>{curWeather}</Text>,
      headerLeft: () => <Text>{curOccasion}</Text>,
    });
  });

  const Card = ({ card }) => {
    var outfit;
    if (card != null) {
      outfit = card.map((value, idx) => (
        <View key={idx} style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.cardImage}>
              {/* <View key={idx} style={styles.cardImage}> */}
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: "data:image/jpeg;base64," + value.image }}
              />
              {/* </View> */}
            </View>
            <Text key={idx} style={styles.itemText}>
              {value.type + " " + value.color}
            </Text>
          </View>
        </View>
      ));
    }

    return <View style={styles.card}>{outfit}</View>;
  };

  const CardDetails = ({ index }) => (
    <View key={testing[index].pieceid} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        <Text style={[styles.text, styles.price]}>
          {fits[0][index].toString()}
        </Text>
      </Text>
    </View>
  );

  const refreshBuffer = () => {
    setChange(!change);
    setLoad(false);
    setIndex(0);
    setLikes([]);
    var send = [];
    send.push(likes.slice(0, index+1));
    send.push(fits[0].slice(0, index+1));
    send.push(fits[1].slice(0, index+1));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    };
    // End Calibrate, getFits(), reset index, set proper variables
    fetch(`http://${API}:${NODEPORT}/end_calibrate/123/`, requestOptions).then(
      (response) => {
        if (!response.ok) {
          throw response;
        }
        console.log(response);
      }
    );
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
    } else {
      var y = fits;
      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
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
    } else {
      var y = fits;
      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
    }
  };

  const endCalibration = () => {
    var send = [];
    send.push(likes.slice(0,index));
    send.push(fits[0].slice(0, index));
    send.push(fits[1].slice(0, index));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    };
    // End Calibrate, getFits(), reset index, set proper variables
    fetch(`http://${API}:${NODEPORT}/end_calibrate/123/`, requestOptions).then(
      (response) => {
        if (!response.ok) {
          throw response;
        }
        return response;
      }
    );

    const trainOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`http://${API}:${NODEPORT}/recommender_train/123/`, trainOptions).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    });

    navigation.navigate("Screening");
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
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.red}
            onPress={() => {
              swiperRef.current.swipeLeft();
            }}
          />
          <MaterialCommunityIcons.Button
            name="check"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.green}
            onPress={() => {
              swiperRef.current.swipeRight();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={endCalibration}
        disabled={false}
      >
        <Text style={styles.panelButtonTitle}>End Calibration</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    fontSize: 50,
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
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },
});
