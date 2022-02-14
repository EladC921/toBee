import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picUri, setPicUri] = useState("https://reactjs.org/logo-og.png");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.flipBtn, styles.button]}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.captureBtn]}
            onPress={async () => {
              if (camera) {
                const data = await camera.takePictureAsync(null);
                console.log(data.uri);
                setPicUri(data.uri);
              }
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 30,
  },

  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },

  flipBtn: {
    flex: 0.2,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },

  captureBtn: {
    position: "absolute",
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255, 0.7)",
  },

  text: {
    fontSize: 18,
    color: "white",
  },
});
