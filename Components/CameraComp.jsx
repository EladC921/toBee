import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

const CameraComp = () => {
  // Camera
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [cameraRequest]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera type={type}>
      <TouchableOpacity
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <Text>Flip</Text>
      </TouchableOpacity>
    </Camera>
  );
};

const styles = StyleSheet.create({});

export default CameraComp;
