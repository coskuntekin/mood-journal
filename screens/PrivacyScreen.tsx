import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const PrivacyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
        vestibulum nunc. Sed nec odio sit amet felis fermentum ultricies. Sed
        nec odio sit amet felis fermentum ultricies. Sed nec odio sit amet felis
        fermentum ultricies. Sed nec odio sit amet felis fermentum ultricies.
        Sed nec odio sit amet felis fermentum ultricies. Sed nec odio sit amet
        felis fermentum ultricies. Sed nec odio sit amet felis fermentum
        ultricies. Sed nec odio sit amet felis fermentum ultricies. Sed nec odio
        sit amet felis fermentum ultricies. Sed nec odio sit amet felis
        fermentum ultricies. Sed nec odio sit amet felis fermentum ultricies.
        Sed nec odio sit amet felis fermentum ultricies. Sed nec odio sit amet
        felis fermentum ultricies. Sed nec odio sit amet felis fermentum
        ultricies. Sed nec odio sit amet felis fermentum ultricies. Sed nec odio
        sit amet felis fermentum ultricies. Sed nec odio sit amet felis
        fermentum ultricies. Sed nec odio sit amet felis fermentum ultricies.
        Sed nec odio sit amet felis fermentum ultricies. Sed nec odio sit amet
        felis fermentum ultricies. Sed nec odio sit amet felis fermentum
        ultricies. Sed nec odio sit amet felis fermentum ultricies. Sed nec odio
        sit amet felis fermentum ultricies. Sed nec odio sit amet felis
        fermentum ultricies. Sed nec odio sit amet felis fermentum ultricies.
        Sed nec odio sit amet felis fermentum ultricies. Sed nec odio sit amet
        felis fermentum ultricies. Sed nec odio sit amet felis fermentum
        ultricies.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#404444',
  },
  content: {
    color: '#404444',
    fontSize: 16,
    paddingBottom: 18,
  },
});

export default PrivacyScreen;
