import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./screens/LoginScreen";
import ItemScreen from "./screens/ItemScreen";
import SecondItemScreen from "./screens/SecondItemScreen";
import ORCode from "./screens/ORCode";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={ItemScreen} />
        <Stack.Screen name="QR" component={ORCode} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Product" component={SecondItemScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
    // <View>
    //   <ItemScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
