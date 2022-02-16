import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { Icon } from "react-native-elements";
import Moment from "moment";

const GroupTask = (props) => {
  const [taskStatus, setTaskStatus] = useState(props.status);
  const [btnVisableStatus, setBtnVisableStatus] = useState({
    regToBTN: false,
    completedBtn: false,
  });
  const [regToState, setRegToState] = useState(props.regTo);

  let COLOR = "white";
  //set date format to print
  let createdAtDate = Moment(props.createdAt).format("YYYY-MM-DD, h:mm");
  let dotoDate = Moment(props.dueDate).format("YYYY-MM-DD, h:mm");
  let timeLeft = Moment(props.dueDate).endOf("day").fromNow();

  useEffect(() => {
    setBtnStatFunction();
  }, []);

  useEffect(() => {
    setBtnStatFunction();
  }, [taskStatus]);

  const setBtnStatFunction = () => {
    if (taskStatus === "registered") {
      setBtnVisableStatus((prev) => ({
        ...prev,
        regToBTN: false,
        completedBtn: true,
      }));
    }
    if (taskStatus === "regAble") {
      setBtnVisableStatus((prev) => ({
        ...prev,
        regToBTN: true,
        completedBtn: false,
      }));
    }
  };

  const postUserInTask = () => {
    let apiUrl_AssignUserToTaskInGroup =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Tasks/AssignUserToTaskInGroup?gid=" +
      props.gid +
      "&uid=" +
      props.uid +
      "&tid=" +
      props.tid;
    fetch(apiUrl_AssignUserToTaskInGroup, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("POST User request:\n");
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          alert("You have successfully registered");
          console.log("fetch POST= ", result);
          props.setTasks(result);
        },
        (error) => {
          alert("There was a problem try again");
          setTaskStatus("registered");
          console.log("err post=", error);
        }
      );
  };

  const TaskCompleted = () => {
    let apiUrl_TaskCompleted =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Tasks/CompleteTask?gid=" +
      props.gid +
      "&uid=" +
      props.uid +
      "&tid=" +
      props.tid;
    fetch(apiUrl_TaskCompleted, {
      method: "PUT",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("POST User request:\n");
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          alert("Task completed");
          console.log("fetch POST= ", result);
          props.setTasks(result);
        },
        (error) => {
          alert("There was a problem try again");
          console.log("err post=", error);
        }
      );
  };

  const regToTask = () => {
    Alert.alert("Are you sure you want to do this task?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: postUserInTask },
    ]);
  };

  const completedTask = () => {
    Alert.alert(
      "If you complete the task after approval it will be deleted",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: TaskCompleted },
      ]
    );
  };
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
        <View style={styles.bottomLeft}>
          <Text style={{ fontSize: 12, marginBottom: 7 }}>
            <Text style={{ fontWeight: "600" }}>Create by: </Text>
            {props.creator}
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 7 }}>
            <Text style={{ fontWeight: "600" }}>Registered: </Text>
            {props.regTo}
          </Text>
        </View>
        <View style={styles.bottomright}>
          {btnVisableStatus.regToBTN && (
            <Pressable onPress={regToTask}>
              <Icon
                name="hand-right-outline"
                type="ionicon"
                color="#023047"
                iconStyle={{
                  fontSize: 30,
                  padding: 0,
                }}
              />
            </Pressable>
          )}
          {btnVisableStatus.completedBtn && (
            <Pressable onPress={completedTask}>
              <Icon
                name="checkmark-done-outline"
                type="ionicon"
                color="#023047"
                iconStyle={{
                  fontSize: 30,
                  padding: 0,
                }}
              />
            </Pressable>
          )}
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomright: {
    flexDirection: "row",
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
