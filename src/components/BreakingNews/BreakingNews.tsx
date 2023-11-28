import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";

var { width } = Dimensions.get("window");

export default function BreakingNews({  label, data }) {
  const navigation = useNavigation();

  // console.log("b-1               ",data.articles)


  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // console.log("Trending Movies", data);
  // console.log("label", label);

  return (
    <View className="">
      {/* Carousal */}
      <Carousel
        data={data.articles}
        renderItem={({ item }) => (
            <BreakingNewsCard item={item} handleclick={handleClick} />
          )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        sliderHeight={1000}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}