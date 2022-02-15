import { View, Text, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import InviteToGroupBTN from "./InviteToGroupBTN";

const MemberListItem = (props) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.leftContainer}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{
            uri: props.imgUrl,
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
          {props.name}
        </Text>
        <Text>@{props.nickName}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 3,
  },
});
export default MemberListItem;
