import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const goToDataScreen = () => {
    navigation.navigate('DataScreen');
  };

  const goToCalendarSettingsScreen = () => {
    navigation.navigate('CalendarSettingsScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Settings</Text>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.btnList} onPress={goToDataScreen}>
          <View style={styles.btnView}>
            <Ionicons name="server" size={20} color="#404444" />
            <Text style={styles.btnText}>Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#404444" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnList}
          onPress={goToCalendarSettingsScreen}>
          <View style={styles.btnView}>
            <Ionicons name="calendar-clear" size={20} color="#404444" />
            <Text style={styles.btnText}>Calendar</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#404444" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnList, styles.lastChild]}>
          <View style={styles.btnView}>
            <Ionicons name="notifications" size={20} color="#404444" />
            <Text style={styles.btnText}>Reminder</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#404444" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle}>Feedback</Text>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={[styles.btnList, styles.lastChild]}>
          <View style={styles.btnView}>
            <Ionicons name="flag" size={20} color="#404444" />
            <Text style={styles.btnText}>Give Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#404444" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle}>About</Text>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.btnList}>
          <View style={styles.btnView}>
            <Ionicons name="star" size={20} color="#404444" />
            <Text style={styles.btnText}>Rate this app</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#404444" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnList, styles.lastChild]}
          onPress={() => navigation.navigate('PrivacyScreen')}>
          <View style={styles.btnView}>
            <Ionicons name="shield" size={20} color="#404444" />
            <Text style={styles.btnText}>Privacy</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#404444" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 18,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#404444',
    marginBottom: 18,
  },
  cardWrapper: {
    backgroundColor: '#ded7f4',
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#404444',
    marginBottom: 12,
    paddingLeft: 18,
  },
  btnList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#a3accb',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  btnText: {
    fontSize: 18,
    color: '#404444',
  },
  lastChild: {
    borderBottomWidth: 0,
  },
});

export default ProfileScreen;
