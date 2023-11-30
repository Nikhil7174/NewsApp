import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
// import Loading from "../components/Loading";
import { categories } from "../constants/categories";

// import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";

import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews/BreakingNews";
import { isLoading } from "expo-font";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  // const loadMoreData = async () => {
     // Fetch more data and append it to the existing newsMain array
  //   const moreData = await fetchMoreNewsData(); // Implement this function to fetch more data
  //   SetRecommendedNews((prevData) => [...prevData, ...moreData]);
  // };

  // Breaking News
  const { isLoading: isTrendingLoading , data: ApiData, error, isSuccess} = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  const { isLoading: isRecommendedLoading , data: ApiData2 } = useQuery({
    queryKey: ["recommededNews"],
    queryFn: fetchRecommendedNews,
  });

  // console.log("breakingNews", breakingNews);
  console.log(ApiData2)

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Trending News */}

        {isTrendingLoading ? (
        // <Text>Loading...</Text>
        <Loading/>
      ) : (
        <View className="">
          <MiniHeader label="Breaking News" />
          {ApiData != undefined && <BreakingNews label="Breaking News" data={ApiData} />}
            
          </View>
        )}

        {/* News */}
        <View className="">
          <MiniHeader label="Recommended" />

          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            {isRecommendedLoading ? (
        // <Text>Loading...</Text>
        <Loading/>
      ) : (
            <NewsSection
              newsMain={ApiData2.articles}
              label="Recommendation"
              loadMoreData={categories}
            />
      )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}