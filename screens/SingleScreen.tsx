import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getEmojiByMood} from '../lib/emoji';

interface IMood {
  id: number;
  date: string;
  emoji: string;
  note: boolean;
}

const SingleScreen = () => {
  const route = useRoute();

  const mood = (route.params as {mood?: IMood})?.mood as IMood;
  const date = mood.date.split(',')[0];
  const [year, month, day] = date.split('-');

  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'default',
    {month: 'long'},
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <View style={styles.pageTimeWrapper}>
          <Text style={styles.pageHeaderDay}>{day}</Text>
          <Text style={styles.pageHeaderMonth}>{monthName}</Text>
        </View>
        <Text style={styles.pageEmoji}>{getEmojiByMood(mood.emoji)}</Text>
      </View>
      <View style={styles.noteWrapper}>
        <Text style={styles.pageText}>
          {typeof mood?.note === 'string' ? (mood?.note as string).trim() : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16,
    height: '100%',
    backgroundColor: '#fff2db',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 18,
    backgroundColor: '#ffd575',
    borderRadius: 18,
  },
  pageTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pageHeaderMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404444',
    lineHeight: 40,
  },
  pageHeaderDay: {
    minWidth: 55,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#404444',
    lineHeight: 40.5,
  },
  pageEmoji: {
    fontSize: 30,
  },
  pageText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#404444',
  },
  noteWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
});

export default SingleScreen;
