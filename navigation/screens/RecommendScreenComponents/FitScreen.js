/*
Screen: FitScreen
Purpose: Screen that displays Recommendations to the user, where the user can 
like, dislike and choose their outfit for the day given a weather and occasion
*/

// Imports
import React from "react";
import {
  StatusBar,
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
import { transition } from "../../utils/SwiperTransition";
import { Card } from "../../utils/OutfitRender";
import { styles } from "../../../assets/StyleSheets/FitScreenStyle";
import {
  IDtoJSX,
  fetchEndCalibration,
  fetchRecommenderTrain,
  OOTD,
  getRecommendations,
} from "../../utils/Fetches";

const { width } = Dimensions.get("window");

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "green",
};

// swiper and transition references for the swiping animation
const swiperRef = React.createRef();
const transitionRef = React.createRef();

/*
Function: Recommender
Purpose: Main function that handles functionaility and rendering of the screen
*/
export default function Recommender({ route, navigation }) {
  const wardrobe = React.useContext(ClothesContext);
  const uid = React.useContext(UserContext);

  const [index, setIndex] = React.useState(0);
  const [fits, setFits] = React.useState(route.params.initial);
  const [likes, setLikes] = React.useState([]);

  const [curWeather] = React.useState(route.params.weather);
  const [curOccasion] = React.useState(route.params.occasion);

  const [change, setChange] = React.useState(false); // this determines whether the fits need to be fetched again
  
  // convert the initial fits to JSX objects
  const [testing, setOutfits] = React.useState(
    IDtoJSX(route.params.initial, wardrobe)
  );                                            
  const [loaded, setLoad] = React.useState(true);  // boolean that indicates if fits have actually been loaded

  // only get new fits if the buffer runs out (or change is true) and if the fits have been rendered
  React.useEffect(() => {
    if (!loaded) {
      getRecommendations(curOccasion, curWeather, setFits, uid);
    } else {
      setLoad(false);
    }
  }, [change]);

  // converts the pieceids to their JSON form using the context on load demand
  React.useEffect(() => {
    if (!loaded) {
      maps = [];
      fits.forEach(function (item, _) {
        var ids = item.filter((value) => value !== 0);
        const test = ids.map(function (value) {
          var val = wardrobe.find((element) => element.pieceid === value);
          return val;
        });
        maps.push(test);
      });
      setOutfits(maps);
    }
  }, [fits, change]); // updates only when a new fetch comes

  // displays weather and occasion on the top of the screen
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

  /*
  Fetches a new batch of fits when there is one fit remaining
  Output : resets the fits buffer with the next set of fits
  */
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

  /*
  Registers a dislike rating (0) when a user swipes left
  Output : adds the rating and cycles to the next outfit
  */
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

  /*
  Registers a like rating (1) when a user swipes right
  Output : adds the rating and cycles to the next outfit
  */
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

  /*
  When the user presses the Finish button, puts the fits rating and sends it
  to the model so it learns from this phase as well
  Output : Trains the model and navigates back to the main Recommend screen
  */
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

  /*
  Registeres the chosen Outfit of the Day (hanger)
  Output : sends the OOTD to the backend
  */
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
      {/* renders the background image */}
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
      {/* renders the swiper with the outfits on the Cards */}
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
