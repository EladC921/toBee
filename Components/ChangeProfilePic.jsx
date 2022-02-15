import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const ChangeProfilePic = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalPic}
      onRequestClose={() => {
        props.setModal(!props.modalPic);
      }}
    >
      <View style={styles.modal}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            props.setModalPic(false);
            props.goToCamera();
          }}
        >
          <Text style={styles.txt}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            props.setModalPic(false);
            props.goToGallery();
          }}
        >
          <Text style={styles.txt}>Choose from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => props.setModalPic(false)}
        >
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "35%",
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },

  btn: {
    width: "90%",
    alignItems: "center",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgb(214, 214, 214)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },

  txt: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },

  cancelBtn: {
    width: "90%",
    alignItems: "center",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
  },

  cancelTxt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default ChangeProfilePic;
