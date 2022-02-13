import { View, Text,StyleSheet } from "react-native";
import React from "react";
import { Calendar,CalendarList, Agenda } from "react-native-calendars";


/**test */
const Calendaric = () => {
  return (
    <View style={styles.page}>
     <View style={styles.container}>
     <CalendarList
     horizontal={true}
     style={styles.cal}
     />
     </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  page:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: '#FFE889',
    
    paddingTop:150,
    width: '100%',   
    shadowOffset: {
      width: 0,
      height: 2
  },
  shadowOpacity: 0.8,
  shadowRadius: 4,
  elevation: 5
  
  },
  cal:{
  borderTopStartRadius:20,
  borderTopEndRadius:20,


  },
})
export default Calendaric;
