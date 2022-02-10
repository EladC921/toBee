import { StyleSheet, View, Text } from "react-native";
import React from "react";
import GroupTask from "./GroupTask";

const GroupsTask = (props) => {
  return (
    <View style={[styles.groupsContainer, { backgroundColor: props.color }]}>
      {/** The task header */}
      <View style={styles.grouplist_title}>
        <Text>{props.groupName}</Text>
      </View>
      <GroupTask
        color={props.color}
        groupName={props.groupName}
        title={props.title}
        text={props.text}
        createdAt={props.createdAt}
        dueDate={props.dueDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupsContainer: {
    marginTop: 20,
    margin: 5,
    borderRadius: 20,
  },

  grouplist_title: {
    padding: 5,
    alignItems: "center",
  },
});

export default GroupsTask;
