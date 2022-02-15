import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import Moment from "moment";

const Task = (props) => {
  let createdAtDate = Moment(props.createdAt).format("YYYY-MM-DD, h:mm");
  let dotoDate = Moment(props.dueDate).format("YYYY-MM-DD, h:mm");
  let timeLeft = Moment(props.dueDate).endOf("day").fromNow();

  return (
    <View style={styles.list_item_container}>
      <View style={styles.left}>
        <Text style={styles.list_item_title_Text}>{props.title}</Text>
        <Text style={styles.list_item_text_Text}>{props.text}</Text>
        <Text style={styles.list_item_date_Text}>{createdAtDate}</Text>
      </View>
      <View style={styles.right}>
        <Icon
          name="checkbox-outline"
          type="ionicon"
          color="#E2AB05"
          iconStyle={{ fontWeight: "1600" }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list_item_container: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    borderRadius: 20,
    margin: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  left: { flex: 5 },
  right: { flex: 1 },
  list_item_title_Text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#575757",
    marginBottom: 5,
  },
  list_item_text_Text: {
    fontSize: 14,
    color: "#6b6b6b",
    marginBottom: 10,
  },
  list_item_date_Text: { fontSize: 10, color: "#6b6b6b" },
});

export default Task;
