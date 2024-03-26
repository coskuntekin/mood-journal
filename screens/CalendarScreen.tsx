import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserMoods, getUserMoodsByDate} from '../lib/database';
import {getEmojiByMood} from '../lib/emoji';

interface IMood {
  time: string;
  date: string;
  emoji: string;
  note: string;
}

const CalendarScreen = () => {
  const [userMoods, setUserMoods] = useState<IMood[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [moodsByDate, setMoodsByDate] = useState<IMood[]>([]);
  const titleCurrentDate = new Date().toISOString().split('T')[0];

  const fetchUserMoodsByDate = async (date: string) => {
    try {
      const moods: IMood[] = (await getUserMoodsByDate(1, date)) as IMood[];
      setMoodsByDate(moods);
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  };

  const fetchUserMoods = useCallback(async () => {
    try {
      const moods: IMood[] = (await getUserMoods(1)) as IMood[];
      setUserMoods(moods);
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserMoods();
    }, [fetchUserMoods]),
  );

  const [year, month, day] = titleCurrentDate.split('-');

  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'default',
    {month: 'long'},
  );

  let markedDates: {
    [key: string]: {};
  } = {
    [currentDate]: {
      customStyles: {
        container: styles.selectedDayContainer,
        text: styles.selectedDayText,
      },
    },
    ...userMoods.reduce((dates, mood) => {
      const date = mood.date.split(',')[0];
      dates[date] = {
        customStyles: {
          container:
            date === currentDate
              ? styles.selectedDayContainer
              : styles.markedDateContainer,
          text:
            date === currentDate
              ? styles.selectedDayText
              : styles.markedDateText,
        },
      };
      return dates;
    }, {} as {[key: string]: {customStyles?: {container: any; text: any}}}),
  };

  const handleDayPress = async (selectedDay: {dateString: string}) => {
    setCurrentDate(selectedDay.dateString);
    await fetchUserMoodsByDate(selectedDay.dateString);
  };

  const formattedTime = (time: string) => {
    return moment(time, 'HH:mm').format('HH:mm');
  };

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageTimeWrapper}>
        <Text style={styles.pageHeaderToday}>Today</Text>
        <Text style={styles.pageHeaderDay}>{day}</Text>
        <Text style={styles.pageHeaderMonth}>{monthName}</Text>
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
        markingType="custom"
        markedDates={markedDates}
        enableSwipeMonths={false}
        onDayPress={handleDayPress}
      />
      {moodsByDate.length === 0 ? (
        <Card style={styles.cardEmpty} mode="contained">
          <Ionicons
            style={styles.cardEmptyIcon}
            name="fish"
            size={48}
            color="#a3accb"
          />
          <Text style={styles.cardEmptyText}>
            No moods recorded for the selected date.
          </Text>
        </Card>
      ) : (
        <View style={styles.viewWrapper}>
          {moodsByDate.map((mood, index) => (
            <Card
              key={index}
              style={styles.card}
              mode="contained"
              disabled={!mood.note}
              accessibilityLabel="Mood Card"
              accessibilityHint="Tap to view more details"
              onPress={() => navigation.navigate('SingleScreen', {mood})}>
              <Card.Content>
                <View style={styles.cardDateView}>
                  <Ionicons name="time-outline" size={16} color="#a3accb" />
                  <Text style={styles.cardDate}>
                    {formattedTime(mood.time)}
                  </Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardNote}>
                    {mood.note.length > 20
                      ? `${mood.note.slice(0, 20)}...`
                      : mood.note}
                  </Text>
                  <Text style={styles.cardEmoji}>
                    {getEmojiByMood(mood.emoji)}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}
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
  pageHeaderMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404444',
    lineHeight: 40,
  },
  pageHeaderToday: {
    width: 60,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a3accb',
    lineHeight: 40,
  },
  pageHeaderDay: {
    width: 55,
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
  cardEmpty: {
    width: '100%',
    paddingBottom: 24,
    paddingTop: 24,
    borderRadius: 18,
    backgroundColor: '#caeef7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmptyIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardEmptyText: {
    color: '#717373',
    fontSize: 16,
  },
  viewWrapper: {
    marginBottom: 24,
  },
  card: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#caeef7',
    borderRadius: 18,
  },
  cardDateView: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
    alignItems: 'center',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#a3accb',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardNote: {
    width: '80%',
    color: '#717373',
    fontSize: 20,
  },
  cardEmoji: {
    backgroundColor: 'white',
    padding: 8,
    fontSize: 28,
    borderRadius: 50,
    textAlign: 'right',
  },
  markedDateContainer: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#6a67f4',
    borderRadius: 8,
  },
  markedDateText: {
    color: '#6a67f4',
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
    height: '100%',
    padding: 16,
  },
});

export default CalendarScreen;
