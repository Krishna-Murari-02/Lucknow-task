import { View, Image, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import logo from "../assets/fruit2.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const Ads = () => {
  return (
    <View style={tw`px-2 mt-1`}>
      <View
        style={tw`justify-between items-center  flex-row shadow-sm px-2 rounded-md `}
      >
        <View>
          <Text style={tw`text-xl font-bold text-red-600 tracking-wide`}>
            Weekly Savings
          </Text>
          <Text style={tw`text-gray-600 font-thin text-xs tracking-normal`}>
            ARE HERE JUST FOR YOU
          </Text>
          <TouchableOpacity
            style={tw`bg-red-600 rounded-md flex-row w-36 mt-5 text-white justify-center`}
          >
            <Text style={tw`text-white`}>Know Your Offer</Text>
          </TouchableOpacity>
        </View>
        <Image style={tw`h-28  w-28`} source={logo} />
      </View>
    </View>
  );
};

export default Ads;
