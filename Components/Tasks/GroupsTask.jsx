import { StyleSheet, View, Text } from "react-native";
import React from "react";
import GroupTask from "./GroupTask";

const GroupsTask = (props) => {
  return (
    <View style={[styles.groupTaskContainer, { backgroundColor: props.color }]}>
      {/** The task header */}
      <View style={styles.groupTitle}>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          {props.groupName}
        </Text>
      </View>
      <View style={styles.groupTask}>
        <GroupTask
          color={props.color}
          groupName={props.groupName}
          title={props.title}
          text={props.text}
          createdAt={props.createdAt}
          dueDate={props.dueDate}
          creator={props.creator}
          registered={props.registered}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupTaskContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  groupTitle: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  groupTask: {
    flex: 4,
    width: "100%",
  },
});

export default GroupsTask;
