/*
 Component: CalibrateSwipe
 Purpose: Handles loading and swiping of outfits on the screen
 */

// imports
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
// Local Imports 
import { ClothesContext } from "../../../context/AppContext";
import { UserContext } from "../../../context/UserIDContext";
import weather_mapping from "../../../components/weather_mapping";
import occasion_mapping from "../../../components/occasion_mapping";
import { transition } from "../../utils/SwiperTransition";
import {
  getFits,
  fetchEndCalibration,
  fetchRecommenderTrain,
  IDtoJSX,
} from "../../utils/Fetches";
import { Card } from "../../utils/OutfitRender";
import Styles from "../../../assets/StyleSheets/CalibrateSwipeStyle"
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

// Create ref's
const swiperRef = React.createRef();
const transitionRef = React.createRef();

export default function App({ route, navigation }) {
  // Load contexts
  const a = React.useContext(ClothesContext);
  const uid = React.useContext(UserContext);
  //setup states
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
    if (!loaded) {
      getFits(setFits, uid);
    } else {
      setLoad(false);
    }
  }, [change]);
 // Set current occasion and weather for the given outfit
  React.useEffect(() => {
    setOccasion(fits[1][index][0]);
    setWeather(fits[1][index][1]);
  }, [index, fits[0]]); // updates these fields only when fits[0] has fnished init (NOTE this has to be in a separate hook)

  // Process the outfits to a way that is ready for rendering
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

  // Deprecated?
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });
  /*
  Function: refreshBuffer
  Purpose: Refresh the buffer with new outfits to be rendered. Sends the old ones to the backend with likes/dislikes.
  */
  const refreshBuffer = () => {
    setChange(!change);
    setLoad(false);
    setIndex(0);
    setLikes([]);
    var send = [];
    // Push lists to a single list
    send.push(likes.slice(0, index + 1));
    send.push(fits[0].slice(0, index + 1));
    send.push(fits[1].slice(0, index + 1));
    // Send post
    fetchEndCalibration(send, uid);
  };

  /* Function: onSwipedLeft
     Purpose: Processing for after a swipe has ocurred.
     Input: None
     Output: None
  */
  const onSwipedLeft = () => {
    transitionRef.current.animateNextTransition();

    // Push disliked to list
    var x = likes;
    x.push(0);
    setLikes(x);
    // Increment index
    setIndex((index + 1) % testing.length);
    // check if refresh is needed
    if (index + 1 == testing.length) {
      refreshBuffer();
    } else {
      var y = fits;
      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
    }
  };

    /* 
     Function: onSwipedRight
     Purpose: Processing for after a swipe has ocurred.
     Input: None
     Output: None
  */
  const onSwipedRight = () => {
    transitionRef.current.animateNextTransition();
    // Update with like
    var x = likes;
    x.push(1);
    setLikes(x);
    
    // Update index
    setIndex((index + 1) % testing.length);
    
    // Check for refresh
    if (index + 1 == testing.length) {
      refreshBuffer();
    } else {
      var y = fits;

      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
    }
  };
  /*
  Function: endCalibration
  Purpose: finish calibration and send the loaded fits to the backend
  Input: None
  Output: None
  */
  const endCalibration = () => {
    // Load lists
    var send = [];
    send.push(likes.slice(0, index));
    send.push(fits[0].slice(0, index));
    send.push(fits[1].slice(0, index));

    // Send to backend
    fetchEndCalibration(send, uid);
    fetchRecommenderTrain(uid);

    // Navigate back to Base calibrate screen
    navigation.navigate("Screening");
  };

  return (
    <SafeAreaView style={Styles.container}>
      <MaterialCommunityIcons
        name="crop-square"
        size={width}
        color={colors.blue}
        style={{
          opacity: 0.00,
          transform: [{ rotate: "45deg" }, { scale: 1.6 }],
          position: "absolute",
          left: -15,
          top: 30,
        }}
      />
      <Text style = {Styles.text2}>
              {" "}
              Weather: {weather_mapping[curWeather]}                 Occasion:{" "}
              {occasion_mapping[curOccasion]}
            </Text>
      <StatusBar hidden={true} />
      <View style={Styles.swiperContainer}>
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

      <View style={Styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={Styles.bottomContainerMeta}
        >
          {/* <CardDetails index={index} /> */}
        </Transitioning.View>

        <View style={Styles.bottomContainerButtons}>
          {/* <View>
        <Text> Weather: {weather_mapping[curWeather]}, Occasion: {occasion_mapping[curOccasion]}</Text>
        </View> */}

          <View>
          </View>
          <MaterialCommunityIcons.Button
            name="close"
            size={30}
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
            size={30}
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
        style={Styles.commandButton}
        onPress={endCalibration}
        disabled={false}
      >
        <Text style={Styles.panelButtonTitle}>End Calibration</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
