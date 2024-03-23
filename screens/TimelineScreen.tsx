import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {styled} from 'nativewind';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import {getUserMoods} from '../lib/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getEmojiByMood} from '../lib/emoji';

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);

interface IMood {
  date: string;
  emoji: string;
  note: boolean;
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

  const navigation = useNavigation();

  const groupedMoods: {[key: string]: IMood[]} = userMoods.reduce(
    (groups, mood) => {
      const date = mood.date.split(',')[0];

      const currentDate = moment(date).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'MMMM Do',
      });

      if (!groups[currentDate]) {
        groups[currentDate] = [];
      }
      groups[currentDate].push(mood);
      return groups;
    },
    {} as {[key: string]: IMood[]},
  );

  const sortedDates = Object.keys(groupedMoods).sort((a, b) =>
    moment(b, 'MMMM Do').diff(moment(a, 'MMMM Do')),
  );

  return (
    <StyledScrollView className="mt-4 px-4">
      <StyledView className="w-full mb-4">
        <StyledText className="text-2xl text-black font-bold">
          Welcome back 🤙
        </StyledText>
        <StyledText className="text-lg text-slate-400">
          A great day to be productive
        </StyledText>
      </StyledView>
      {sortedDates.reverse().map(date => (
        <View key={date} style={styles.cardGroup}>
          <Text style={styles.cardTime}>{date}</Text>
          <View
            style={
              date === 'Today'
                ? styles.cardWrapperToday
                : styles.cardWrapperOtherDay
            }>
            {groupedMoods[date].map((mood, index) => (
              <Card
                key={index}
                style={styles.card}
                disabled={!mood.note}
                accessibilityLabel="Mood Card"
                accessibilityHint="Tap to view more details"
                elevation={2}
                onPress={() => navigation.navigate('SingleScreen', {mood})}>
                <Card.Content style={styles.cardContent}>
                  {mood.note && (
                    <Ionicons
                      name="glasses-outline"
                      color={'#717373'}
                      size={24}
                      style={styles.cardNote}
                    />
                  )}
                  <Text style={styles.cardMoodText}>{mood.emoji}</Text>
                  <Text style={styles.cardEmoji}>
                    {getEmojiByMood(mood.emoji)}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      ))}
    </StyledScrollView>
  );
};

const styles = StyleSheet.create({
  cardGroup: {
    marginBottom: 16,
  },
  cardNote: {
    position: 'absolute',
    right: -10,
    top: -10,
    transform: [{rotate: '45deg'}],
  },
  cardWrapperToday: {
    backgroundColor: '#ffe599',
    padding: 18,
    borderRadius: 24,
  },
  cardWrapperOtherDay: {
    backgroundColor: '#ded7f4',
    padding: 18,
    borderRadius: 24,
  },
  card: {
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
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
