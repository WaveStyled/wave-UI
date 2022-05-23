import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  StatusBar,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

function emailchecker(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return false;
  }
  return true;
}

function AuthScreen({ route, navigation }) {
  const [validEmail, isValid] = useState(false);
  const [emptyName, isFilled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeat] = useState("");
  const [name, setName] = useState("");
  const [reenter, setReenter] = useState(true);
  const [uid, setUserID] = useState(-1);

  const [login, setLogin] = useState(true);

  useEffect(() => {
    isValid(emailchecker(email));
  }, [email]);

  useEffect(() => {
    isFilled(name.length > 0);
  }, [name]);

  useEffect(() => {
    if (!login && password !== repeatPassword) {
      setReenter(true);
    } else {
      setReenter(false);
    }
  }, [password, repeatPassword]);

  const signup = () => {
    setLogin(!login);
  };

  const loginHandler = () => {
    console.log("here");
  };

  return (
    <View style={styles.image}>
      <View style={styles.card}>
        {login ? (
          true
        ) : (
          <View style={{ alignSelf: "flex-start"}}>
            <Button onPress={() => setLogin(!login)} title="Back" />
          </View>
        )}
        <Text style={styles.heading}>{login ? "Login" : "Signup"}</Text>
        <StatusBar style="auto" />
        {login ? (
          true
        ) : (
          <View style={styles.action}>
            <Ionicons name="person-outline" size={40} />
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#003f5c"
                onChangeText={(name) => setName(name)}
              />
            </View>
          </View>
        )}
        {login ? (
          true
        ) : (
          <View style={styles.validEmail}>
            {emptyName ? (
              true
            ) : (
              <Text style={{ color: "#f44336" }}>Please Enter Your Name</Text>
            )}
          </View>
        )}

        <View style={styles.action}>
          <Ionicons name="mail-outline" size={40} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>

        <View style={styles.validEmail}>
          {validEmail ? (
            true
          ) : (
            <Text style={{ color: "#f44336" }}>Please Enter a Valid Email</Text>
          )}
        </View>
        <View style={styles.action}>
          <Ionicons name="lock-closed-outline" size={40} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>
        </View>
        {login ? (
          true
        ) : (
          <View style={styles.action2}>
            <Ionicons name="lock-closed-outline" size={40} />
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(pass) => setRepeat(pass)}
              />
            </View>
          </View>
        )}
        {login ? (
          true
        ) : (
          <View style={styles.validEmail}>
            {!reenter ? (
              true
            ) : (
              <Text style={{ color: "#f44336" }}>Passwords Do Not Match</Text>
            )}
          </View>
        )}
        {!login ? (
          true
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={loginHandler}
            disabled={!validEmail}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={login ? signup : loginHandler}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 20 }}>
          <Button
            onPress={() => {
              navigation.navigate("MainApp", { id: 123 });
              setLogin(!login);
            }}
            title="TestButtons"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,238,0.5)",
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "80%",
    marginTop: "40%",
    borderRadius: 20,
    maxHeight: 500,
    paddingBottom: "30%",
    alignItems: "center",
  },
  heading: {
    paddingTop: "5%",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "10%",
    color: "black",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "5%",
  },
  inputs: {
    width: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
    paddingLeft: 40,
  },
  input: {
    width: "80%",
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "black",
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonAlt: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonAltText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  message: {
    fontSize: 16,
    marginVertical: "5%",
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "#CCCCFF",
    borderRadius: 30,
    width: "80%",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  validEmail: {
    width: "70%",
    marginBottom: 20,
    marginTop: 5,
    fontSize: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: "80%",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "75%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#40B5AD",
    marginBottom: 30,
  },
  signupBtn: {
    width: "45%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#40B5AD",
  },
  action: {
    flexDirection: "row",
    paddingRight: 10,
  },
  action2: {
    flexDirection: "row",
    paddingRight: 10,
    marginTop: 10,
  },
});

export default AuthScreen;
