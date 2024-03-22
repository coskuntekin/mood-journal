import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserMoodsByDate} from '../lib/database';

interface IMood {
  date: string;
  emoji: string;
  note: boolean;
}

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [userMoods, setUserMoods] = useState<IMood[]>([]);
  const titleCurrentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }, []);

  const [year, month, day] = titleCurrentDate.split('-');

  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'default',
    {month: 'long'},
  );

  // let markedDates: {
  //   [key: string]: {customStyles: {container: any; text: any}};
  // } = userMoods.reduce((dates, mood) => {
  //   dates[mood.date] = {
  //     customStyles: {
  //       container: styles.specialDateContainer,
  //       text: styles.specialDateText,
  //     },
  //   };
  //   return dates;
  // }, {} as {[key: string]: {customStyles: {container: any; text: any}}});

  // Mark the selected day with a custom style
  let markedDates: {
    [key: string]: {customStyles: {container: any; text: any}};
  } = {
    [currentDate]: {
      customStyles: {
        container: styles.selectedDayContainer,
        text: styles.selectedDayText,
      },
    },
    ...userMoods.reduce((dates, mood) => {
      dates[mood.date] = {
        customStyles: {
          container: styles.specialDateContainer,
          text: styles.specialDateText,
        },
      };
      return dates;
    }, {} as {[key: string]: {customStyles: {container: any; text: any}}}),
  };

  const fetchUserMoods = useCallback(async () => {
    try {
      const moods: IMood[] = (await getUserMoodsByDate(
        1,
        currentDate,
      )) as IMood[];
      setUserMoods(moods);
      console.log('moods', moods);
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  }, [currentDate]);

  useFocusEffect(
    useCallback(() => {
      fetchUserMoods();
    }, [fetchUserMoods]),
  );

  const handleDayPress = async (selectedDay: {dateString: string}) => {
    console.log(selectedDay);
    setCurrentDate(selectedDay.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageTimeWrapper}>
        <Text style={styles.pageHeaderToday}>Today&nbsp;</Text>
        <Text style={styles.pageHeaderDay}>{day}</Text>
        <Text style={styles.pageHeaderText}>{monthName}</Text>
      </View>
      <Calendar
        style={styles.calender}
        renderArrow={direction => (
          <Ionicons
            name={direction === 'left' ? 'arrow-back' : 'arrow-forward'}
            size={24}
            color="#717373"
          />
        )}
        minDate="2024-01-01"
        firstDay={1}
        markedDates={markedDates}
        markingType="custom"
        enableSwipeMonths={false}
        onDayPress={handleDayPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageTimeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 8,
    marginBottom: 16,
  },
  pageHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404444',
    lineHeight: 40,
  },
  pageHeaderToday: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a3accb',
    lineHeight: 40,
  },
  pageHeaderDay: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#404444',
    lineHeight: 40.5,
  },
  calender: {
    marginBottom: 16,
    borderRadius: 18,
    backgroundColor: '#caeef7',
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  markedDateContainer: {
    backgroundColor: '#6a67f4',
    borderRadius: 8,
  },
  markedDateText: {
    color: 'white',
  },
  selectedDayContainer: {
    backgroundColor: '#6a67f4',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
  },
  specialDateContainer: {
    borderWidth: 1.5,
    borderColor: '#6a67f4',
    borderStyle: 'dotted',
    borderRadius: 8,
  },
  specialDateText: {
    color: '#6a67f4',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CalendarScreen;
