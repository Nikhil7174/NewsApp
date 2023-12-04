import { Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetailsScreen from "../screens/NewsDetailsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
// import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { useColorScheme } from "nativewind";      
import SettingsScreen from "../screens/SettingsScreen";
import { Provider } from "react-redux";
import  store  from "../redux/Store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const TabNavigator = () => {
    return (
      <Provider store={store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              iconName = "compass-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }

            const customizeSize = 25;
            colorScheme == "dark" ? "black" : "white"
            if(colorScheme == "dark"){
              return (
                <Ionicons
                  name={iconName}
                  size={customizeSize}
                  color={focused ? "white" : "gray" }
                  // color="green"
                />
              );
            }else{
              return (
                <Ionicons
                  name={iconName}
                  size={focused ? customizeSize+5 :customizeSize}
                  color={focused ? "#1e3a8a" : "gray" }
                  // color="green"
                />
              );
            }
          },

          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarLabel:() => {return null},
          tabBarLabelStyle: {
            fontSize: 16,
            // fontFamily: "SpaceGroteskMedium",
            // paddingBottom: 10,
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
            borderTopColor: "transparent",
            // borderTopWidth: 0,
            // padding: 10,
            // height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
      </Provider>
    );
  };
  
  return (
    //@ts-ignore
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashS"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashS" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ animation: "slide_from_bottom"}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default AppNavigation