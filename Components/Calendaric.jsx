import { View,time, Text, StyleSheet,timeToString,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";


/**test */
const Calendaric = () => {
  const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

  return (
    <View style={styles.page}>
      
      <View style={styles.container}>

      <Calendar
      
      markingType={'multi-dot'}
      markedDates={{
        '2022-02-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
        '2022-02-26': {dots: [massage, workout], disabled: true}
      }}
       onDayPress={day => {
        alert(day.dateString);
      }}
      />
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {
    
    backgroundColor: '#FFE889',
    height:'100%',
    flex:1,
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
  cal: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,


  },
})
export default Calendaric;
