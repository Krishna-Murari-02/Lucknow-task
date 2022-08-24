import { Button, Text, View, StyleSheet } from "react-native";
import React, { Component, useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import tw from "tailwind-react-native-classnames";
import { BarCodeScanner } from "expo-barcode-scanner";

const ORCode = ({ navigation, route }) => {
  const { mono } = route.params;
  const [hasPermission, sethasPermission] = useState(null);
  const [scanned, setscanned] = useState(false);
  const [text, settext] = useState("not yet scanned");
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      sethasPermission((status = "granted"));
    })();
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setscanned(true);
    settext(data);
    console.log("Type" + type + "\nData" + data);
  };
  if (hasPermission === null) {
    <View>
      <Text>Requesting for camera Permission</Text>
    </View>;
  }
  if (hasPermission === false) {
    <View>
      <Text>No access to camera</Text>
      <Button title={"Allow Camera"} onPress={() => askForCameraPermission()} />
    </View>;
  }
  return (
    <View style={style.container}>
      <QRCode
        value={mono}
        size={220}
        color="white"
        backgroundColor="black"
      ></QRCode>
      <View style={style.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
        <Text>{text}</Text>
        {scanned && (
          <Button title={"Scan Again"} onPress={() => setscanned(false)} />
        )}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    marginTop: 30,
    backgroundColor: "#fff",
    alignItem: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});

export default ORCode;
