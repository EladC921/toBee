import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Task = (props) => {
  return (
    <View
      style={[
        styles.list_item,
        { backgroundColor: props.create ? "white" : "lightgray" },
      ]}
    >
      <View style={styles.list_item_title}>
        <Text style={styles.list_item_title_Text}>{props.title}</Text>
      </View>
      <View style={styles.list_item_text}>
        <Text>{props.text}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {props.create && (
            <Ionicons style={{ fontWeight: 1000, fontSize: 40 }} name="add" />
          )}
        </View>
      </View>
      <View style={styles.list_item_date}>
        <Text style={styles.list_item_date_Text}>
          {props.createdAt.toString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list_item: {
    backgroundColor: "lightgray",
    width: 150,
    maxWidth: 120,
    maxHeight: 180,
    height: 180,
    borderRadius: 20,
    margin: 5,
  },

  list_item_title: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 5,
  },

  list_item_title_Text: { fontSize: 12, padding: 5, fontWeight: "600" },

  list_item_text: { marginTop: "10%", padding: 5 },

  list_item_text_Text: { fontSize: 10, padding: 5 },

  list_item_date: { position: "absolute", right: 8, bottom: 8 },

  list_item_date_Text: { fontSize: 7, color: "gray" },
});

export default Task;
