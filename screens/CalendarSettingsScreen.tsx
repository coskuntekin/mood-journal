import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {getUserProfile} from '../lib/database';

interface IUserProfile {
  username: string;
  profileImage: string;
  calendarStartDay: string;
}

const CalendarSettingsScreen = () => {
  const [value, setCalendarStartDay] = useState('0');

  const fetchUserProfile = async () => {
    const userProfile: IUserProfile = (await getUserProfile(1)) as IUserProfile;
    setCalendarStartDay(userProfile.calendarStartDay);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>First day of the week</Text>
      <View style={styles.cardWrapper}>
        <RadioButton.Group
          onValueChange={newValue => setCalendarStartDay(newValue)}
          value={value}>
          <RadioButton.Item
            label="Sunday"
            style={styles.radioGroup}
            labelStyle={styles.labelText}
            value="0"
            color="#404444"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
          <RadioButton.Item
            label="Monday"
            style={[styles.radioGroup, styles.lastChild]}
            labelStyle={styles.labelText}
            value="1"
            color="#404444"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
        </RadioButton.Group>
      </View>
      <Text style={styles.userNote}>
        Note: Changing the first day of the week will affect the calendar view.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 18,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#404444',
    marginBottom: 18,
  },
  cardWrapper: {
    backgroundColor: '#ded7f4',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#404444',
    marginBottom: 12,
    paddingLeft: 18,
  },
  labelText: {
    fontSize: 18,
    color: '#404444',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#a3accb',
  },
  radioLabel: {
    fontSize: 18,
    color: '#404444',
  },
  lastChild: {
    borderBottomWidth: 0,
  },
  userNote: {
    fontSize: 16,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 42,
    color: '#404444',
  },
});

export default CalendarSettingsScreen;
