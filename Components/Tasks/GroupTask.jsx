import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const GroupTask = (props) => {
  let COLOR = props.color;
  return (
    <View style={[styles.grouplist_item, { backgroundColor: COLOR }]}>
      {/** The task body */}
      <View style={[styles.list_item, { backgroundColor: COLOR }]}>
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
          <Text style={styles.list_item_dueDate_Text}>
            <Text style={{ color: "black", fontSize: 8 }}>Due to: </Text>
            {props.dueDate.toString()}
          </Text>
        </View>
      </View>
      {/** The task footer */}
      <View style={[styles.grouplist_footer, { backgroundColor: COLOR }]}>
        <View style={styles.registeredTo}>
          <Text>Registered to: </Text>
          <Image
            style={styles.avatar}
            source={require("../../Images/avatar.png")}
          />
          <Image
            style={styles.avatar}
            source={require("../../Images/avatar.png")}
          />
          <Image
            style={styles.avatar}
            source={require("../../Images/avatar.png")}
          />
        </View>
        <View style={{ position: "absolute", bottom: 10, right: 10 }}>
          <Ionicons
            style={{ color: "gray" }}
            name="help-buoy-outline"
          ></Ionicons>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grouplist_item: {
    margin: 5,
    width: 220,
    maxWidth: 220,
    maxHeight: 230,
    height: 230,
    borderRadius: 20,
  },

  grouplist_footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 5,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  registeredTo: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    margin: 2,
    width: 15,
    height: 15,
    borderRadius: 20,
  },

  list_item: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 200,
    maxHeight: 200,
  },

  list_item_title: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
  },

  list_item_title_Text: { fontSize: 16, padding: 5, fontWeight: "bold" },

  list_item_text: { marginTop: "10%", padding: 5 },

  list_item_text_Text: { fontSize: 14, padding: 5 },

  list_item_date: { position: "absolute", right: 8, bottom: 8 },

  list_item_date_Text: { fontSize: 7, color: "gray" },

  list_item_dueDate_Text: { fontSize: 7, color: "red" },
});

export default GroupTask;
