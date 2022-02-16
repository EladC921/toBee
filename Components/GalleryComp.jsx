import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function GalleryComp({ route, navigation: { goBack } }) {
  const [imagePicked, setImagePicked] = useState(false);
  const [image, setImage] = useState(null);
  const { Uid } = route.params;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImagePicked(true);
    }
  };

  // Upload image to server
  const imageUpload = (imgUri, picName) => {
    let urlAPI = "https://proj.ruppin.ac.il/bgroup68/test2/tar5/uploadpicture";
    let dataI = new FormData();
    dataI.append("picture", {
      uri: imgUri,
      name: picName,
      type: "image/jpg",
    });

    const config = {
      method: "POST",
      body: dataI,
    };

    fetch(urlAPI, config)
      .then((res) => {
        if (res.status == 201) {
          return res.json();
        } else {
          return "err = " + res.status;
        }
      })
      .then((responseData) => {
        setImage(responseData);
      })
      .catch((err) => {
        alert("err upload= " + err);
      });

    goBack();
  };

  return (
    <View style={styles.photoContainer}>
      {imagePicked ? (
        <Button title="Choose another image" onPress={pickImage} />
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
      {image && (
        <>
          <View>
            <Image source={{ uri: image }} style={styles.redSquare} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => goBack()}>
              <Text style={styles.txt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => {
                imageUpload(image, Uid + ".jpg");
              }}
            >
              <Text style={styles.txt}>Set Profile Picture</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  photoContainer: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  redSquare: {
    alignSelf: "stretch",
    width: 300,
    height: "60%",
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "rgb(0, 157, 255)",
    margin: 10,
  },

  approveBtn: {
    width: "45%",
    backgroundColor: "green",
    borderRadius: 50,
    padding: 15,
    margin: 5,
  },

  cancelBtn: {
    width: "45%",
    backgroundColor: "red",
    borderRadius: 50,
    padding: 15,
    margin: 5,
  },
  txt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
