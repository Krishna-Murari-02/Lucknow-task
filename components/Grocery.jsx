import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const Grocery = ({ title, image }) => {
  return (
    <View
      style={tw`flex-col items-center  p-1 bg-white  w-20 shadow mr-3 mb-2`}
    >
      <Text style={tw`text-red-500 font-bold`}>{title}</Text>
      <Image
        style={tw`w-14 h-14 mt-1`}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

export default Grocery;
