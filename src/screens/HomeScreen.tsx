import { View, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
// import Loading from "../components/Loading";
import { categories } from "../constants/categories";


// import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews/BreakingNews";
import { isLoading } from "expo-font";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  const [dataFromChild, setDataFromChild] = useState("in");

  // const queryClient = useQueryClient();

  // Function to receive data from the child component
  const handleDataFromChild = (data) => {
    console.log('Data from child                           :', data);
    setDataFromChild(data);
  };

  // const loadMoreData = async () => {
     // Fetch more data and append it to the existing newsMain array
  //   const moreData = await fetchMoreNewsData(); // Implement this function to fetch more data
  //   SetRecommendedNews((prevData) => [...prevData, ...moreData]);
  // };

  console.log(dataFromChild, "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", dataFromChild, "www")
  const country = "us"
  console.log(country)

  const cc = useSelector((state:any)=>state.cart.countryCode)
  console.log(cc,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  // Breaking News
    const { isLoading: isTrendingLoading , data: ApiData, error, isSuccess} = useQuery({
      queryKey: ["breakingNews", cc],
      queryFn: ()=>fetchBreakingNews(cc),
    });
  
    const { isLoading: isRecommendedLoading , data: ApiData2 } = useQuery({
      queryKey: ["recommededNews", cc],
      queryFn: ()=>fetchRecommendedNews(cc),
    });
  
  console.log(dataFromChild)
  // console.log("breakingNews", breakingNews);
  console.log(ApiData2)

  // useEffect(() => {
  //   const invalidateBreakingNews = async () => {
  //     try {
  //       // Invalidate the cache for breaking news query when the country code changes
  //       await queryClient.invalidateQueries(["breakingNews", dataFromChild]);
  //     } catch (error) {
  //       console.error("Error invalidating breaking news cache:", error);
  //     }
  //   };

  //   invalidateBreakingNews();
  // }, [dataFromChild, queryClient]);

  // useEffect(() => {
  //   const invalidateRecommendedNews = async () => {
  //     try {
  //       // Invalidate the cache for recommended news query when the country code changes
  //       await queryClient.invalidateQueries(["recommendedNews", dataFromChild]);
  //     } catch (error) {
  //       console.error("Error invalidating recommended news cache:", error);
  //     }
  //   };

  //   invalidateRecommendedNews();
  // }, [dataFromChild, queryClient]);

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header handleDataFromChild={handleDataFromChild}/>

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
          <View className="h-[0.5px] w-full bg-slate-100 dark:bg-neutral-800" />

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