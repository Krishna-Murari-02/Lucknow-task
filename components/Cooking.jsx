import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import oil from "../assets/oil.png";

const Cooking = () => {
  return (
    <View style={tw`flex-col  p-1 bg-white  w-28 rounded-md shadow mr-4`}>
      <Image style={tw`h-24  w-24`} source={oil} />

      <View>
        <Text style={tw`font-bold tracking-wide text-base`}>Cooking Oil</Text>
        <Text style={tw`text-xs font-extralight text-gray-400`}>5Ltr</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <Text>$25</Text>
          <Ionicons name="add-circle-outline" size={18} color="red" />
        </View>
      </View>
    </View>
  );
};

export default Cooking;
