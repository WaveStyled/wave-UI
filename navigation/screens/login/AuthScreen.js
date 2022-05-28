/*
Screen: AuthScreen
Purpose: Screen that facilitates user login and signup and controls access to 
a user's wardrobe/outfits 
*/

// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import { auth } from "./FireBaseData";
import { styles } from "../../../assets/StyleSheets/AuthScreenStyle";

/*
Function: emailchecker

Purpose: validates that the given string is a valid email address

Input : email --> email to check
Outfit : True if valid False otherwise
*/
function emailchecker(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return false;
  }
  return true;
}

/*
Function: AuthScreen
Purpose: Main function that handles functionaility and rendering of the screen
*/
function AuthScreen({ route, navigation }) {
  const [validEmail, isValid] = useState(true); // boolean checks for email, name, password validity
  const [emptyName, isFilled] = useState(false);
  const [reenter, setReenter] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeat] = useState("");
  const [name, setName] = useState("");
  const [uid, setUserID] = useState(-1);
  const [error, setError] = useState("");
  const [isError, tryAgain] = useState(true);

  const [login, setLogin] = useState(true); // login page (true) or signup page (false)

  useEffect(() => {
    setError("");
  }, [email, password]);

  // if the authorization goes successfully, then log into the main app with the user id
  // Output : screen will go to the Home page of the app if authorization goes through
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("MainApp", { id: user.uid });
      }
    });
  }, []);

  useEffect(() => {
    isValid(emailchecker(email));
  }, [email]);

  useEffect(() => {
    isFilled(name.length > 0);
  }, [name]);

  // handles password verification
  useEffect(() => {
    if (!login && password !== repeatPassword) {
      setReenter(true);
    } else {
      setReenter(false);
    }
  }, [password, repeatPassword]);

  // signs a user up for the app if createUser is successful via firebase
  // Output : sends user back to login page and clear errors if successful
  //         if not, then shows the error and asks user to try again
  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserID(user.uid);
        setLogin(!login);
        setError("");
        tryAgain(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        tryAgain(true);
        console.log(errorMessage);
      });
  };

  // Output: switches the screen from login to signup and vice versa & clears errors
  const loginHandler = () => {
    setLogin(!login);
    setError("");
  };

  // Signs user into the app with the current email and password. Once auth goes through
  // the page will navigate to the wardrobe
  // Output : if user is successful, naviagates otherwise try again
  const signin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserID(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.image}>
      <View style={styles.card}>
        {/* If on the sign up page, renders a button to go back to login */}
        {login ? (
          true
        ) : (
          <View style={{ alignSelf: "flex-start" }}>
            <Button onPress={() => setLogin(!login)} title="Back" />
          </View>
        )}
        <Text style={styles.heading}>{login ? "Login" : "Signup"}</Text>
        <StatusBar style="auto" />
        {/* If on the sign up page, renders a text input to provide user's name */}
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
        {/* If on the sign up page, ensures a name is entered to complete sign up */}
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
          {/* If on any page, prints an error if email is invalid */}
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

        {/* If signup, asks user to re-enter password to ensure its correct*/}
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

        {/* If on signup page, prints an error if passwords do not match */}
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

        {/* If on login page, renders the login button */}
        {!login ? (
          true
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={signin}
            disabled={!validEmail || error.length > 0}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={login ? loginHandler : signup}
          disabled={!login ? !isError : false}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {error.length > 0 ? (
          <Text style={{ color: "#f44336", width: "60%", paddingVertical: 10 }}>
            {error.length > 0 ? error : true}{" "}
          </Text>
        ) : (
          true
        )}
      </View>
    </View>
  );
}

export default AuthScreen;
