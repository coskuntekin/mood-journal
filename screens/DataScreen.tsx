import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DataScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.btnList}>
          <View style={styles.btnView}>
            <Ionicons name="cloud-upload-outline" size={20} color="#404444" />
            <Text style={styles.btnText}>Import</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnList, styles.lastChild]}>
          <View style={styles.btnView}>
            <Ionicons name="cloud-download-outline" size={20} color="#404444" />
            <Text style={styles.btnText}>Export</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.userNote}>
        All your journal data is securely stored on your device. You can easily
        import or export your journal entries whenever needed.
      </Text>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={[styles.btnList, styles.lastChild]}>
          <View style={styles.btnView}>
            <Ionicons name="trash-outline" size={20} color="#ff0000" />
            <Text style={styles.btnTextWarning}>Remove all data</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.userNote}>
        This action will remove all your journal entries from your device. This
        action is irreversible.
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
    paddingHorizontal: 18,
    borderRadius: 8,
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
  btnTextWarning: {
    fontSize: 18,
    color: '#ff0000',
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

export default DataScreen;
