import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import axios from "axios";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//import { useState, useEffect } from 'react';
// Screens

import RecommendScreen from './RecommendScreen';
import CalibrateScreen from './CalibrateScreen';
import HomeContainerScreen from './HomeContainerScreen';







  export default HomeTabs;