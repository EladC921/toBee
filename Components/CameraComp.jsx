import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraComp({ navigation: { goBack } }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picUri, setPicUri] = useState("https://reactjs.org/logo-og.png");
  const [modal, setModal] = useState(false);

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
    <>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={(ref) => setCamera(ref)} type={type}>
          <SafeAreaView style={styles.backBtnContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
              <Text style={styles.text}>Back to Profile</Text>
            </TouchableOpacity>
          </SafeAreaView>
          {/* <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.redSquare}></View>
          </View> */}
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
                setModal(true);
              }}
            ></TouchableOpacity>
          </View>
        </Camera>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Image source={{ uri: picUri }} style={styles.redSquare} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModal(false)}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => goBack()}
            >
              <Text style={styles.text}>Approve</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  redSquare: {
    width: "80%",
    height: "40%",
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "red",
    margin: 10,
  },

  backBtnContainer: {
    flex: 1,
    justifyContent: "center",
  },

  backBtn: {
    position: "absolute",
    top: "10%",
    left: 5,
    borderRadius: 30,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 50,
    marginLeft: "5%",
    marginRight: "5%",
  },

  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },

  flipBtn: {
    flex: 0.2,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 20,
  },

  captureBtn: {
    position: "absolute",
    bottom: 50,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255, 0.9)",
  },

  text: {
    fontSize: 18,
    color: "white",
  },

  cancelBtn: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(216, 6, 6, 0.9)",
    margin: 5,
  },

  approveBtn: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 42, 0.9)",
    margin: 5,
  },

  modalContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
