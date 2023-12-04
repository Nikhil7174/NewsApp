//@ts-nocheck
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      //@ts-ignore
      navigation.navigate("Welcome"); // Navigate to HomeTab
    }, 2000); // 2 seconds delay
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      onLayout={onLayoutRootView}
      className="flex-1 bg-orange-800 justify-center items-center"
    >
      <Text className="text-white text-3xl font-extrabold uppercase">
        NewsBite
      </Text>
    </View>
  );
}