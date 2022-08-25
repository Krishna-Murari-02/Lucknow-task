import { View, Text, StyleSheet, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Ads from "../components/Ads";
import Cooking from "../components/Cooking";
import { ScrollView } from "react-native-gesture-handler";
import Grocery from "../components/Grocery";
import axios from "axios";
import Electronic from "../components/Electronic";
import * as Location from "expo-location";

const ItemScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { mono } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(address[0].subregion);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [apidata, setapidata] = useState(null);
  const productFetch = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        setapidata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    productFetch();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={style.container}
    >
      <View style={tw`pt-5 bg-red-600`}>
        <View style={tw`px-5 py-5 flex-row justify-between items-center`}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back"
            size={24}
            color="white"
          />
          <View style={tw`  flex-row`}>
            <View style={tw`justify-center items-center`}>
              <Text style={tw`text-white  text-base mr-1`}>{text}</Text>
              <Text style={tw`text-gray-200 text-xs`}>{mono}</Text>
            </View>

            <AntDesign
              style={tw`text-gray-200 mt-1`}
              name="down"
              size={15}
              color="white"
            />
          </View>

          <Ionicons
            onPress={() => navigation.navigate("QR", { mono: mono })}
            name="menu"
            size={30}
            color="white"
          />
        </View>
      </View>
      <Ads />

      <View style={tw` px-2 `}>
        <View
          style={tw`rounded-full items-center flex-row py-2 shadow  px-2 mt-3 `}
        >
          <AntDesign
            style={tw`ml-2 mr-1`}
            name="search1"
            size={18}
            color="black"
          />
          <TextInput placeholder="Search" />
        </View>
      </View>
      <View style={tw`px-2`}>
        <View style={tw`flex-row items-center justify-between py-4`}>
          <Text style={tw`font-bold text-base tracking-wide`}>
            Trending Near You
          </Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-red-500 -mr-1`}>See More </Text>
            <MaterialIcons name="keyboard-arrow-right" size={18} color="red" />
          </View>
        </View>
      </View>
      <View style={tw`px-2 flex-row `}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`flex-row  px-2`}>
            {apidata?.map((item, key) => (
              <Cooking image={item.image} key={key} />
            ))}
            <Electronic />
          </View>
        </ScrollView>
      </View>
      <View style={tw` mt-5 `}>
        <Ads />
      </View>
      <View style={tw`flex-row items-center justify-between px-2 py-4`}>
        <Text style={tw`font-bold text-base tracking-wide`}>
          Trending Near You
        </Text>
      </View>
      <View style={tw`flex-row flex-wrap px-2`}>
        {apidata?.map((item, key) => (
          <Grocery
            image={item.image}
            title={item.title.slice(0, 5)}
            key={key}
          />
        ))}
      </View>
      <View style={tw`bg-red-300 mt-2`}>
        <View style={tw`px-2`}>
          <View style={tw`flex-row items-center justify-between py-4`}>
            <Text style={tw`font-bold text-base tracking-wide`}>
              New Arrivals
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-red-500 -mr-1`}>See More </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={18}
                color="red"
              />
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={tw`flex-row  px-2`}>
              {apidata?.map((item, key) => (
                <Electronic image={item.image} key={key} />
              ))}
              <Electronic />
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E3",
  },
});

export default ItemScreen;
