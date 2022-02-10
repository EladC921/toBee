import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Task = (props) => {
  return (
    <View style={styles.list_item}>
      <View style={styles.list_item_title}>
        <Text style={styles.list_item_title_Text}>{props.title}</Text>
      </View>
      <View style={styles.list_item_text}>
        <Text>{props.text}</Text>
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
    width: 200,
    maxWidth: 200,
    maxHeight: 220,
    height: 220,
    borderRadius: 20,
    margin: 5,
  },

  list_item_title: {
    backgroundColor: "rgb(220, 220, 220)",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    alignItems: "center",
  },

  list_item_title_Text: { fontSize: 16, padding: 5, fontWeight: "bold" },

  list_item_text: { marginTop: "10%", padding: 5 },

  list_item_text_Text: { fontSize: 14, padding: 5 },

  list_item_date: { position: "absolute", right: 8, bottom: 8 },

  list_item_date_Text: { fontSize: 7, color: "gray" },
});

export default Task;
