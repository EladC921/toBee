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

export default function GalleryComp({ navigation: { goBack } }) {
  const [imagePicked, setImagePicked] = useState(false);
  const [image, setImage] = useState(null);

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

  setProfilePic = () => {
    let apiUrl_EditProfilePic =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Users/EditProfilePic?imgURL=" +
      image +
      "&uid=" +
      navigation.getParam("user").Uid;
    fetch(apiUrl_EditProfilePic, {
      method: "PUT",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );

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
            <TouchableOpacity style={styles.approveBtn} onPress={setProfilePic}>
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
