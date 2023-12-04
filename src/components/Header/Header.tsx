import { Switch, Text, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import CountryPicker from 'react-native-country-picker-modal'
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import { setCCode } from '../../redux/Reducer';

export default function Header({handleDataFromChild}) {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [cmodal, setCModal] = useState(false)
  

  const [countryCode, setCountryCode] = useState<any>('FR')
  const [country, setCountry] = useState<any>(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
    false,
  )
  const [withFlag, setWithFlag] = useState<boolean>(true)
  const [withEmoji, setWithEmoji] = useState<boolean>(true)
  const [withFilter, setWithFilter] = useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false)
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false)
  const onSelect = (country: any) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  const handleCountryCodeChange = () => {
    // Pass the updated country code to the parent component
    handleDataFromChild(countryCode.toLowerCase());
    // Close the CountryPicker modal
    setCModal(false);
  };

  console.log("header  00000000111222",countryCode.toLowerCase())

  const dispatch = useDispatch();
  const countryCodeToSend = useSelector((state:any) => state.cart.countryCode);

  const handleCountryChange = (newCountryCode) => {
    dispatch(setCCode(newCountryCode));
  };

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="font-spaceGroteskBold text-2xl text-blue-900 dark:text-white font-extrabold uppercase"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          NewsBite
        </Text>
      </View>

      {/* Notification and Search Icon */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />

        <TouchableOpacity
        //@ts-ignore
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-slate-700  rounded-full p-2"
        >
          <MagnifyingGlassIcon
            size={25}
            //@ts-ignore
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Bars3Icon size={25} strokeWidth={2} color={colorScheme == "dark" ? "white" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={
          // handleDataFromChild(countryCode)
          handleCountryChange(countryCode.toLowerCase())
        }>
          {/* <BellIcon size={25} strokeWidth={2} color={colorScheme == "dark" ? "white" : "green"}/> */}
        <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={cmodal}
        // onClose={()=>handleDataFromChild(countryCode.toLowerCase())}
      />
      </TouchableOpacity>
      </View>
    </View>
  );
}