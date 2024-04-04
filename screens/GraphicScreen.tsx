import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const GraphicScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Graphics</Text>
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
});

export default GraphicScreen;
