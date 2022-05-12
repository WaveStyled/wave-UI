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
} from "react-native";

import data from "./data";
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition, set } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API, NODEPORT } from "../../../context/API";
import { ClothesContext } from "../../../context/AppContext";
import { Outfit } from "../../../components/Outfit";
import { OutfitComponent } from "../../../components/OutfitComponent";
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
    setCount(fits[0].length);
    setOccasion(fits[1][index][0]);
    setWeather(fits[1][index][1]);
  }, [index]); // updates these fields only when fits[0] has fnished init (NOTE this has to be in a separate hook)

  React.useEffect(() => {
    if (!loaded2) {
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
    } else {
      setLoad2(false);
    }
  }, [fits[0]]); // updates only when a new fetch comes

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
    // console.log(card[0]);
    //const value = UD(card);
    //console.log(card);
    function UD(data) {
      var list;
      if (Object.keys(data).length !== 0) {
        list = card.map((value) => (
          <Image
            style={{ width: 80, height: 100 }}
            source={{ uri: "data:image/jpeg;base64," + value.image }}
          />
        ));
      }
      return list;
    }

    var outfit;
    if (card != null) {
      const { items = [] } = card;
      //const list = UD(card)
      // const listItems = items.map((item) => (
      //   <OutfitComponent image={item.image} />
      // ));
      outfit = card.map((value, idx) => (
        <View key={idx} style={styles.cardImage}>
          <Image
            style={{ width: 80, height: 100 }}
            source={{ uri: "data:image/jpeg;base64," + value.image }}
          />
          <View style={styles2.circular}></View>
        </View>
      ));
    }

    return <View style={styles.card}>{outfit == null ? true : outfit}</View>;
  };

  const CardDetails = ({ index }) => (
    <View key={curIds[index]} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {testing[index][1][0]}
      </Text>
      <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
    </View>
  );
  const refreshBuffer = () => {
    var send = []
    send.push(likes)
    send.push(fits[1])
    send.push(fits[0])
    
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    };
    // End Calibrate, getFits(), reset index, set proper variables
    fetch(`http://${API}:${NODEPORT}/end_calibrate/123/`,
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      console.log(response)

    })
    
}
  
  const onSwipedLeft = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % testing.length);
    console.log("Left");
    // update 1 outfit before end of buffer, so error doesnt happen on render
    
    var x = likes;
    x.push(0);
    setLikes(x);
    if(index == fits[0].length-2){
      refreshBuffer()
    }
    
    var y = fits;
    setOccasion(y[1][index][0]);
    setWeather(y[1][index][1]);
    setIds(y[0][index]);
    setNext(false);
  };

  const onSwipedRight = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % testing.length);
    console.log("Right");
    var x = likes;
    x.push(1);
    setLikes(x);
    if(index == fits[0].length-2){
      refreshBuffer()
    }
    
    var y = fits;
    setOccasion(y[1][index][0]);
    setWeather(y[1][index][1]);
    setIds(y[0][index]);
    setNext(false);
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
