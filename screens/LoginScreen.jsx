import { View, Text, TextInput, Image, Button, Expo } from "react-native";
import React, { useState } from "react";
import * as Facebook from "expo-facebook";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
const LoginScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [mobileNumber, setmobileNumber] = useState(null);
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: `1060178894655-8mmjd50pfvhc28vsrfia0ha4snr0agjm.apps.googleusercontent.com`,

        iosClientId:
          "1060178894655-ugu9cen5li189nqann7uliv2jskh0juu.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        permission: ["public_profile", "email", "gender", "location"],
      });
      if (result.type === "success") {
        setAccessToken(result.accessToken);
      } else {
        console.log("Permission Denied");
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }
  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }
  function showUserInfo() {
    if (userInfo) {
      return (
        <View>
          <Image
            source={{
              uri: userInfo.picture,
            }}
          />
          <Text>{userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  //facebook.............................

  async function logIn() {
    try {
      console.log("first");
      // await Facebook.initializeAsync({
      //   appId: "1011637782813672",
      //   // appId: "1172532569865844",
      // });

      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View
      style={tw`p-8 flex-1 bg-red-500 text-white justify-between w-full border  items-center border`}
    >
      <Text style={tw`font-bold text-4xl text-white`}>Mart India</Text>
      <View>
        <Text style={tw` ml-10 text-3xl text-white font-bold`}>
          Groceries {"\n"} Delivered in {"\n"} 10 minutes{" "}
        </Text>
        <Text style={tw`  text-3xl text-red-500 font-bold`}>
          Groceries Delivered in 10 minutes{" "}
        </Text>
        <View>
          <View
            style={tw`flex-row items-center  mt-14 bg-white p-1 px-2 rounded-full `}
          >
            <Text style={tw`text-gray-500 mr-1`}>+91</Text>
            <TextInput
              onChangeText={(newText) => setmobileNumber(newText)}
              style={tw``}
              Input
              placeholder="Enter Phone Number"
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Landing", { mono: mobileNumber })
            }
            style={tw`border bg-black  justify-center flex-row mt-3 rounded-full  p-1 px-2`}
          >
            <Text style={tw`text-white text-lg `}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title={accessToken ? "Get User Data" : "Login With Google"}
        onPress={accessToken ? getUserData : signInWithGoogleAsync}
      />
      <Button title={"Login With Facebbook"} onPress={logIn} />
      <View>
        <Text style={tw`text-white`}>By continuing, you agree to our</Text>
        <Text style={tw``}>Terms os service & Privacy Policy</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
