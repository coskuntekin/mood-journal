import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getUserMoods,
  getUserMoodsByDate,
  getUserProfile,
} from '../lib/database';
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
  const [refreshing, setRefreshing] = useState(false);
  const [calendarStartDay, setCalendarStartDay] = useState<string>('');

  const titleCurrentDate = new Date().toISOString().split('T')[0];

  const fetchUserMoodsByDate = async (date: string) => {
    try {
      const moods: IMood[] = (await getUserMoodsByDate(1, date)) as IMood[];
      setMoodsByDate(moods.reverse());
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  };

  const fetchUserMoods = useCallback(async () => {
    try {
      const moods: IMood[] = (await getUserMoods(1)) as IMood[];
      setUserMoods(moods.reverse());
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const userProfile = (await getUserProfile(1)) as {
        calendarStartDay: string;
      };
      setCalendarStartDay(userProfile.calendarStartDay);
    } catch (error) {
      console.log('Error', 'Failed to fetch user profile');
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserMoods();
    setRefreshing(false);
  }, [fetchUserMoods]);

  useFocusEffect(
    useCallback(() => {
      fetchUserMoods();
      fetchUserProfile();
    }, [fetchUserMoods, fetchUserProfile]),
  );

  useEffect(() => {
    fetchUserMoodsByDate(titleCurrentDate);
  }, [titleCurrentDate]);

  const [year, month, day] = titleCurrentDate.split('-');

  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'default',
    {month: 'long'},
  );

  let markedDates: {
    [key: string]: {
      customStyles?: {container: any; text: any};
      marked?: boolean;
      selected?: boolean;
      dotColor?: string;
    };
  } = {
    ...userMoods.reduce((dates, mood) => {
      const date = mood.date.split(',')[0];
      dates[date] = {
        marked: true,
        selected: date === currentDate,
        dotColor: '#6a67f4',
      };
      return dates;
    }, {} as {[key: string]: {customStyles?: {container: any; text: any}; marked?: boolean; selected?: boolean; dotColor?: string}}),
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
        firstDay={calendarStartDay === '0' ? 0 : 1}
        markedDates={markedDates}
        enableSwipeMonths={false}
        initialDate={titleCurrentDate}
        onDayPress={handleDayPress}
        theme={{
          todayBackgroundColor: '#ffe599',
          todayTextColor: '#404444',
          selectedDayTextColor: '#404444',
          selectedDayBackgroundColor: '#ded7f4',
        }}
      />
      <View style={styles.selectedMoodsHead}>
        <View style={styles.selectedMoodDay}>
          <Ionicons name="calendar-number-outline" size={16} color="#a3accb" />
          <Text style={styles.selectedMoodDayText}>
            {moment(currentDate || titleCurrentDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        {moodsByDate.length > 0 && (
          <View style={styles.selectedMoodDay}>
            <Ionicons name="balloon-outline" size={16} color="#a3accb" />
            <Text style={styles.selectedMoodDayText}>
              {moodsByDate.length === 1
                ? '1 mood'
                : `${moodsByDate.length} moods`}
            </Text>
          </View>
        )}
      </View>
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
                <View style={styles.cardContent}>
                  <View style={styles.cardGrid}>
                    <Text style={styles.cardEmoji}>
                      {getEmojiByMood(mood.emoji)}
                    </Text>
                    <View style={styles.cardInner}>
                      <Text style={styles.cardTitle}>{mood.emoji}</Text>
                      <Text style={styles.cardNote}>
                        {mood.note && mood.note.length > 20
                          ? `${mood.note.substring(0, 20)}...`
                          : mood.note || 'No note provided'}
                      </Text>
                      <View style={styles.cardDateView}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color="#a3accb"
                        />
                        <Text style={styles.cardDate}>
                          {formattedTime(mood.time)}
                        </Text>
                      </View>
                    </View>
                    {mood.note !== '' && (
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#a3accb"
                      />
                    )}
                  </View>
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
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: '#caeef7',
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  selectedMoodsHead: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  selectedMoodDay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  selectedMoodDayText: {
    fontSize: 16,
    color: '#a3accb',
  },
  viewWrapper: {
    marginBottom: 24,
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
  cardTitle: {
    fontSize: 24,
    color: '#404444',
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  cardEmptyText: {
    color: '#717373',
    fontSize: 16,
  },
  card: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#caeef7',
    borderRadius: 18,
  },
  cardDateView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#a3accb',
  },
  cardInner: {
    width: '70%',
  },
  cardContent: {
    borderRadius: 18,
  },
  cardNote: {
    color: '#717373',
    fontSize: 20,
    marginBottom: 4,
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 38,
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
