import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import Moment from "moment";

const GroupTask = (props) => {
  let COLOR = "white";
  //set date format to print
  let createdAtDate = Moment(props.createdAt).format("YYYY-MM-DD, h:mm");
  let dotoDate = Moment(props.dueDate).format("YYYY-MM-DD, h:mm");
  let timeLeft = Moment(props.dueDate).endOf("day").fromNow();
  return (
    <View style={[styles.cardContainer, { backgroundColor: COLOR }]}>
      <View style={styles.topContainer}>
        <View style={styles.taskContentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleTxt}>{props.title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTxt}>{props.text}</Text>
          </View>
        </View>
        <View style={{ flex: 1.1, width: "100%" }}>
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
              <Text style={styles.dateTxt}>{createdAtDate}</Text>
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
          <View style={styles.dateRow}>
            <View style={styles.leftDateRow}>
              <Icon
                name="hourglass-outline"
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
                Time left:
              </Text>
              <Text style={styles.dateTxt}>{timeLeft}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 12, marginBottom: 7 }}>
          <Text style={{ fontWeight: "600" }}>Create by: </Text>
          {props.creator}
        </Text>
        <Text style={{ fontSize: 12, marginBottom: 7 }}>
          <Text style={{ fontWeight: "600" }}>Registered: </Text>
          {props.registered}
        </Text>
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
  },
  bottomContainer: {
    borderTopWidth: 1,
    flex: 1,
    padding: 10,
  },
  taskContentContainer: {
    flex: 2,
    width: "100%",
  },
  titleContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
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
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600",
  },
  textTxt: {
    fontSize: 11,
  },
  dateTxt: {
    fontSize: 9,
  },
});

export default GroupTask;
