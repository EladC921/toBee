import { StyleSheet, View, Text } from "react-native";
import React from "react";
import GroupTask from "./GroupTask";

const GroupsTask = (props) => {
  return (
    <View style={[styles.groupTaskContainer, { backgroundColor: props.color }]}>
      {/** The task header */}
      <View style={styles.groupTitle}>
        <Text>{props.groupName}</Text>
      </View>
      <View style={styles.groupTask}>
        <GroupTask
          color={props.color}
          groupName={props.groupName}
          title={props.title}
          text={props.text}
          createdAt={props.createdAt}
          dueDate={props.dueDate}
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
  },
  groupTitle: {
    flex: 1,
    width: "100%",
  },
  groupTask: {
    flex: 4,
    width: "100%",
  },
});

export default GroupsTask;
