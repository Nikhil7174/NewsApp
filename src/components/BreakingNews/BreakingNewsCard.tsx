import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-svg';

const BreakingNewsCard = ({item, handleclick}) => {

  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
 
  return (
    <TouchableWithoutFeedback onPress={() => handleclick(item)}>
        
        <View className='relative'>
            <Image 
                source = {{
                    uri: item.urlToImage
                }}
                style = {{
                    width: width * 0.8,
                    height: height * 0.22
                }}
                resizeMode='cover'
                className="rounded-3xl"
                />
            
            <LinearGradient
                //@ts-ignore
                colors = {["transparent", "rgba(0,0,0,0,9"]}
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                }}
                start={{ x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
            />

            <View className='absolute bottom-6 left-4 justify-end h-[80%]'>
                <View className='space-y-1'>
                    <View className='max-w[90%'>
                        <Text className='text-white text-base font-semibold capitalize'>
                            {
                                item?.title?.length > 60 ? item.title.slice(0, 58) + "..." : item.title.split(" ")[0] || "N/A"
                            }
                        </Text>
                    </View>

                    <View>
                        <Text className='text-neutral-300 text-sm font-medium'>
                            {
                                item?.author?.length >  20 ? item?.author.slice(0, 20) + "..." : item.author || "N/A"
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default BreakingNewsCard