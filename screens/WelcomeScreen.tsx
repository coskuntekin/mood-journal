import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WelcomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation();

  const goTimeline = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={require('../images/welcome.jpg')}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Embrace Your Emotions!</Text>
          <Text style={styles.subHeaderText}>One Entry at a Time</Text>
          <TouchableOpacity style={styles.btnCircle} onPress={goTimeline}>
            <Text style={styles.buttonText}>
              <Ionicons
                name="arrow-forward-outline"
                color={'white'}
                size={32}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a75c8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  headerText: {
    fontSize: 30,
    color: '#404444',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 24,
    color: '#a3accb',
    textAlign: 'center',
    marginBottom: 32,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
  },
});

export default WelcomeScreen;
