import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const GroupTask = (props) => {
  let COLOR = props.color;
  //set date format to print
  let createdAtDate = props.createdAt.toDateString();
  let doToDateMinutes =
    props.dueDate.getMinutes() < 10
      ? "0" + props.dueDate.getMinutes().toString()
      : props.dueDate.getMinutes().toString();
  let dotoDate =
    props.dueDate.getHours().toString() +
    ":" +
    doToDateMinutes +
    " " +
    props.dueDate.toDateString();

  return (
    <View style={[styles.cardContainer, { backgroundColor: COLOR }]}>
      <View style={styles.topContainer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.titleTxt}>{props.title}</Text>
          <Text style={styles.textTxt}>{props.text}</Text>
        </View>
        <View style={{ flex: 1.5, width: "100%" }}>
          <View style={styles.dateRow}>
            <View style={styles.leftDateRow}>
              <Icon
                name="time-outline"
                type="ionicon"
                color="#686868"
                iconStyle={{
                  fontWeight: "1600",
                  fontSize: 18,
                  padding: 0,
                }}
              />
            </View>
            <View style={styles.rightLeftRow}>
              <Text style={{ fontWeight: "600", fontSize: 10 }}>
                Created at:
              </Text>
              <Text style={styles.dateTxt}>{dotoDate}</Text>
            </View>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.leftDateRow}>
              <Icon
                name="time-outline"
                type="ionicon"
                color="#686868"
                iconStyle={{
                  fontWeight: "1600",
                  fontSize: 18,
                  padding: 0,
                }}
              />
            </View>
            <View style={styles.rightLeftRow}>
              <Text style={{ fontWeight: "600", fontSize: 10 }}>Due to:</Text>
              <Text style={styles.dateTxt}>{dotoDate}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Registered:</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    flex: 1,
    padding: 10,
  },
  dateRow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    padding: 3,
  },
  leftDateRow: {
    justifyContent: "center",
    flex: 1,
    justifyContent: "flex-start",

    width: "100%",
  },
  rightLeftRow: {
    flex: 3,
    width: "100%",
  },

  titleTxt: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  textTxt: {
    fontSize: 14,
  },
  dateTxt: {
    fontSize: 9,
  },
});

export default GroupTask;
