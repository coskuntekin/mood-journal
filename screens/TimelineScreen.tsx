import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {styled} from 'nativewind';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, Divider, MD3Colors, ProgressBar} from 'react-native-paper';
import {getUserMoods} from '../lib/database';
import {getEmojiByMood} from '../lib/emoji';

const StyledView = styled(View);
const StyledText = styled(Text);

interface IMood {
  time: string;
  date: string;
  emoji: string;
  note: string;
}

const TimelineScreen = (): React.JSX.Element => {
  const [userMoods, setUserMoods] = useState<IMood[]>([]);

  const fetchUserMoods = async () => {
    try {
      const moods: IMood[] = (await getUserMoods(1)) as IMood[];
      setUserMoods(moods);
    } catch (error) {
      console.log('Error', 'Failed to fetch user moods');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserMoods();
    }, []),
  );

  // Group moods by date
  const groupedMoods: {[key: string]: {[key: string]: IMood[]}} =
    userMoods.reduce((groups, mood) => {
      const date = mood.date.split(',')[0];

      const currentDate = moment(date).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'MMMM Do',
      });

      if (!groups[currentDate]) {
        groups[currentDate] = {};
      }

      const emoji = mood.emoji;

      if (!groups[currentDate][emoji]) {
        groups[currentDate][emoji] = [];
      }

      groups[currentDate][emoji].push(mood);

      return groups;
    }, {} as {[key: string]: {[key: string]: IMood[]}});

  // Sort dates
  const sortedDates = Object.keys(groupedMoods).sort((a, b) =>
    moment(b, 'MMMM Do').diff(moment(a, 'MMMM Do')),
  );

  const totalItemsLength = sortedDates.reduce((total, date) => {
    const moodsByDate = groupedMoods[date];
    const emojis = Object.keys(moodsByDate);
    const itemsLength = emojis.reduce((sum, emoji) => {
      return sum + moodsByDate[emoji].length;
    }, 0);
    if (date === 'Today' || moment(date, 'MMMM Do').isSame(moment(), 'day')) {
      return total + itemsLength;
    }
    return total;
  }, 0);

  // Calculate mood percentages
  const moodPercentagesByDate = sortedDates.reduce(
    (percentagesByDate, date) => {
      const moodPercentages = Object.keys(groupedMoods[date]).reduce(
        (percentages, emoji) => {
          if (!percentages[emoji]) {
            percentages[emoji] = 0;
          }

          percentages[emoji] += groupedMoods[date][emoji].length;

          return percentages;
        },
        {} as {[key: string]: number},
      );

      percentagesByDate[date] = moodPercentages;

      return percentagesByDate;
    },
    {} as {[key: string]: {[key: string]: number}},
  );

  return (
    <ScrollView style={styles.container}>
      <StyledView className="w-full mb-4">
        <StyledText className="text-2xl text-black font-bold">
          Welcome back 🤙
        </StyledText>
        <StyledText className="text-lg text-slate-400">
          A great day to be productive
        </StyledText>
      </StyledView>
      <View style={styles.viewWrapper}>
        {sortedDates.reverse().map(date => {
          const totalItemsForDate =
            date === 'Today' || moment(date, 'MMMM Do').isSame(moment(), 'day')
              ? totalItemsLength
              : Object.values(groupedMoods[date]).reduce(
                  (total, moods) => total + moods.length,
                  0,
                );
          return (
            <View key={date} style={styles.cardGroup}>
              <Text style={styles.cardTime}>{date}</Text>
              <View
                style={
                  date === 'Today'
                    ? styles.cardWrapperToday
                    : styles.cardWrapperOtherDay
                }>
                {Object.keys(groupedMoods[date]).map(emoji => (
                  <View key={emoji}>
                    <Card
                      style={styles.card}
                      accessibilityLabel="Mood Card"
                      accessibilityHint="Tap to view more details"
                      mode="contained">
                      <Card.Content style={styles.cardContent}>
                        <View style={styles.cardEmojiText}>
                          <Text style={styles.cardEmoji}>
                            {getEmojiByMood(emoji)}
                          </Text>
                          <Text style={styles.cardMoodText}>{emoji}</Text>
                        </View>
                        <Text style={styles.cardPercent}>
                          {(
                            (groupedMoods[date][emoji].length /
                              totalItemsForDate) *
                            100
                          ).toFixed(0)}
                          %
                        </Text>
                      </Card.Content>
                    </Card>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
  },
  viewWrapper: {
    marginBottom: 24,
  },
  cardGroup: {
    marginBottom: 16,
  },
  cardNoteIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    transform: [{rotate: '45deg'}],
  },
  cardEmojiText: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  cardNote: {
    color: '#a3accb',
    fontSize: 14,
  },
  cardPercent: {
    color: '#a3accb',
  },
  cardWrapperToday: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    backgroundColor: '#ffe599',
    padding: 18,
    borderRadius: 24,
  },
  cardWrapperOtherDay: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    backgroundColor: '#ded7f4',
    padding: 18,
    borderRadius: 24,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
  },
  cardTime: {
    color: '#a3accb',
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 30,
    textAlign: 'center',
  },
  cardMoodText: {
    color: '#717373',
    fontSize: 20,
    textTransform: 'capitalize',
  },
});

export default TimelineScreen;
