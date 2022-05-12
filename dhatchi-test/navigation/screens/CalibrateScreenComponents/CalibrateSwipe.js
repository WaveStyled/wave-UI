import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import data from "./data";
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition, set } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API, NODEPORT } from "../../../context/API";
import { ClothesContext } from "../../../context/AppContext";
import { OutfitComponent } from "../../../components/OutfitComponent";
import {type_mapping} from '../../../components/types';
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

async function getFits(set) {
  await fetch(`http://${API}:${NODEPORT}/start_calibrate/123/5/`, {
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

function UD(json) {
  var list;
  if (Object.keys(json).length !== 0) {
    list = json.map((clothes) => (
      <OutfitComponent
        key={clothes.pieceid}
        id={clothes.pieceid}
        image={clothes.image}
      />
    ));
    return list;
  }
}

export default function App({ route, navigation }) {
  const a = React.useContext(ClothesContext);

  const [index, setIndex] = React.useState(0);
  const [fits, setFits] = React.useState(route.params.initial);
  const [likes, setLikes] = React.useState([]);

  const [curWeather, setWeather] = React.useState("test");
  const [curOccasion, setOccasion] = React.useState("");
  const [curIds, setIds] = React.useState([0]);
  const [change, setChange] = React.useState(false); // this determines whether the fits need to be fetched again
  const [counter, setCount] = React.useState(0); // this keeps track of the buffer
  const [testing, setOutfits] = React.useState(
    IDtoJSX(route.params.initial[0], a)
  ); // this stores the JSX objects
  const [loaded, setLoad] = React.useState(true);
  const [loaded2, setLoad2] = React.useState(true);
  const [next, setNext] = React.useState(true);

  React.useEffect(() => {
    console.log("HAPPENS");
    if (!loaded) {
      console.log("UPDATE");
      getFits(setFits);
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

  const update = () => {
    //invoke this when the buffer runs out
    setChange(!change);
  };

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
        <View key={idx} style={styles3.item}>
          <View style={styles3.itemLeft}>
            <View style={styles.cardImage}>
              {/* <View key={idx} style={styles.cardImage}> */}
                <Image
                  style={{ width: 80, height: 80 }}
                  source={{ uri: "data:image/jpeg;base64," + value.image }}
                />
              {/* </View> */}
            </View>
            <Text key={idx} style={styles3.itemText}>
              {value.type + " " + value.color}
            </Text>
          </View>
        </View>
      ));
    }

    return <View style={styles.card}>{outfit}</View>;
  };

  const CardDetails = ({ index }) => (
    <View key={curIds[index]} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {testing[index][1][0]}
      </Text>
      <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
    </View>
  );

  const refreshBuffer = async () => {
    setChange(!change);
    setLoad(false);
    setIndex(0);
    setLikes([]);
    var send = [];
    send.push(likes);
    send.push(fits[0]);
    send.push(fits[1]);

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
    // update 1 outfit before end of buffer, so error doesnt happen on render

    var x = likes;
    x.push(0);
    setLikes(x);
    
    if (index + 1 == testing.length) {
      refreshBuffer();
    } else {
      setIndex((index + 1) % testing.length);
      var y = fits;
      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
      setIds(y[0][index]);
      setNext(false);
    }
  };

  const onSwipedRight = () => {
    transitionRef.current.animateNextTransition();
    console.log("Right");

    var x = likes;
    x.push(1);
    setLikes(x);
    if (index + 1 == testing.length) {
      refreshBuffer();
    } else {
      setIndex((index + 1) % testing.length);
      var y = fits;
      setOccasion(y[1][index][0]);
      setWeather(y[1][index][1]);
      setIds(y[0][index]);
      setNext(false);
    }
  };

  const endCalibration = () => {
    var send = [];
    send.push(likes);
    console.log(fits[0].slice(0, index));
    console.log(fits[1].slice(0, index));
    console.log(likes);
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
        console.log(response);
      }
    );


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
          stackSize={stackSize}
          stackScale={10}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
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
        style={styles4.commandButton}
        onPress={endCalibration}
        disabled={false}
      >
        <Text style={styles4.panelButtonTitle}>End Calibration</Text>
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
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  clothsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeClothWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

const styles3 = StyleSheet.create({
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
  delSquare: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "red",
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
  },
  square: {
    width: 80,
    height: 100,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});


const styles4 = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "center",
    backgroundColor: "#dfe3ee",
    paddingVertical: "8%",
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },

  inputButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: "#58D68D",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#E8EAED",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: "5%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#45B39D",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    paddingTop: 20,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});