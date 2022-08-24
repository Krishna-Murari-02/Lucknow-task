import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Electronic = ({ image }) => {
  return (
    <View
      style={tw`justify-center items-center w-28 h-40 shadow-xl mb-3 mr-2 rounded-lg bg-white p-1`}
    >
      <Image
        style={tw`w-14 h-14 mt-1`}
        source={{
          uri: image,
        }}
      />
      <View>
        <Text style={tw`font-bold tracking-wide text-sm mt-2 `}>
          Cooking Oil
        </Text>
        <Text style={tw`text-xs font-extralight text-gray-400`}>5Ltr</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <Text>$25</Text>
          <Ionicons name="add-circle-outline" size={18} color="red" />
        </View>
      </View>
    </View>
  );
};

export default Electronic;
