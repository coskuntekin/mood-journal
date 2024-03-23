import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Portal, RadioButton, Snackbar} from 'react-native-paper';
import {insertMood} from '../lib/database';

const AddScreen = () => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [note, setNote] = useState('');
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNote('');
      setSelectedEmoji('');
      const options = {
        year: 'numeric' as const,
        month: '2-digit' as const,
        day: '2-digit' as const,
        hour: 'numeric' as const,
        minute: 'numeric' as const,
        second: 'numeric' as const,
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const userCurrentDate = new Date().toLocaleString('en-US', options);
      const formattedDate = userCurrentDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        '$3-$1-$2',
      );
      setCurrentDate(formattedDate);
    }, []),
  );

  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    if (selectedEmoji === '') {
      setVisible(true);
      return;
    }

    await insertMood(1, selectedEmoji, currentDate, note);
    navigation.navigate('TimelineScreen');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.selectMoodText}>How are you feeling today?</Text>
      <View style={styles.bgSelectMoodView}>
        <RadioButton.Group
          onValueChange={value => setSelectedEmoji(value)}
          value={selectedEmoji}>
          <RadioButton.Item
            label="😃 Happy"
            labelStyle={styles.labelText}
            value="happy"
            color="#717373"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
          <RadioButton.Item
            label="😢 Sad"
            labelStyle={styles.labelText}
            value="sad"
            color="#717373"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
          <RadioButton.Item
            label="😡 Angry"
            labelStyle={styles.labelText}
            value="angry"
            color="#717373"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
          <RadioButton.Item
            label="😍 Love"
            labelStyle={styles.labelText}
            value="love"
            color="#717373"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
          <RadioButton.Item
            label="😴 Sleepy"
            labelStyle={styles.labelText}
            value="sleepy"
            color="#717373"
            uncheckedColor="#717373"
            rippleColor={'#a3accb'}
          />
        </RadioButton.Group>
      </View>
      <Text style={styles.selectMoodText}>
        Describe your feelings in a few words
      </Text>
      <View style={styles.bgTextareaView}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter your thoughts here..."
          placeholderTextColor="#a3accb"
          value={note}
          onChangeText={setNote}
          accessibilityLabel="Thoughts"
          accessibilityHint="Enter your thoughts about your day here"
        />
      </View>
      <Text style={styles.inputHelper}>
        Adding notes to your 'Mood Journal' is optional, but recommended.
        Providing insights about your mood can enhance your journaling
        experience.
      </Text>
      <Button
        icon="send"
        mode="contained"
        buttonColor="black"
        textColor="white"
        accessibilityHint="Submit your mood and thoughts for today"
        onPress={handleSubmit}>
        Submit
      </Button>
      {selectedEmoji === '' && (
        <Portal>
          <Snackbar
            style={styles.snackbar}
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            action={{
              label: 'Close',
              onPress: () => {
                setVisible(false);
              },
            }}>
            Please select a mood before submitting your thoughts. 😊
          </Snackbar>
        </Portal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#ff6b81',
  },
  selectMoodText: {
    fontSize: 18,
    color: '#a3accb',
    marginBottom: 18,
    paddingLeft: 4,
  },
  bgTextareaView: {
    backgroundColor: '#ffddf4',
    marginBottom: 16,
    borderRadius: 24,
    padding: 18,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#a3accb',
    color: '#404444',
    borderRadius: 18,
    padding: 14,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 120,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 16,
    height: '100%',
    flex: 1,
  },
  labelText: {
    fontSize: 18,
    color: '#717373',
  },
  inputHelper: {
    paddingLeft: 8,
    paddingRight: 8,
    color: '#a3accb',
    fontSize: 12,
    marginBottom: 18,
  },
  bgSelectMoodView: {
    backgroundColor: '#caeef7',
    marginBottom: 18,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 24,
  },
});

export default AddScreen;
