import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';

const GraphicScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Graphics</Text>
      <View>
        <Text style={styles.subTitle}>Daily mood tempature</Text>
        <View style={styles.svgTempContainer}>
          <Svg
            width="240"
            height="240"
            viewBox="0 0 800 800"
            fill="none"
            style={styles.svgTemp}>
            <Path
              d="M400.712 787.227C309.35 787.227 235.022 712.899 235.022 621.538C235.022 561.206 268.297 505.453 320.689 476.483V92.0259C320.689 47.8886 356.587 11.9784 400.712 11.9784C444.836 11.9784 480.734 47.8861 480.734 92.0259V476.481C533.123 505.443 566.401 561.199 566.401 621.538C566.401 712.899 492.073 787.227 400.712 787.227ZM400.712 46.9445C375.868 46.9445 355.655 67.1674 355.655 92.0259V487.193C355.655 490.521 354.705 493.78 352.917 496.588C351.129 499.395 348.576 501.633 345.56 503.04C299.652 524.439 269.988 570.952 269.988 621.538C269.988 693.618 328.632 752.261 400.712 752.261C472.792 752.261 531.435 693.621 531.435 621.538C531.435 570.942 501.774 524.427 455.868 503.04C452.85 501.635 450.296 499.397 448.507 496.59C446.717 493.782 445.767 490.522 445.768 487.193V92.0259C445.768 67.1674 425.555 46.9445 400.712 46.9445Z"
              fill="#4F46A3"
            />
            <Path
              d="M400.712 729.508C342.748 729.508 295.589 682.339 295.589 624.36C295.589 583.692 319.431 546.286 356.33 529.07C360.532 527.109 365.341 526.898 369.699 528.483C374.057 530.068 377.607 533.32 379.567 537.522C381.528 541.724 381.739 546.533 380.154 550.891C378.569 555.249 375.318 558.799 371.115 560.759C346.474 572.256 330.555 597.222 330.555 624.363C330.555 663.06 362.027 694.545 400.712 694.545C439.397 694.545 470.869 663.063 470.869 624.363C470.869 619.726 472.711 615.279 475.989 612C479.268 608.722 483.715 606.88 488.352 606.88C492.989 606.88 497.436 608.722 500.714 612C503.993 615.279 505.835 619.726 505.835 624.363C505.835 682.339 458.676 729.508 400.712 729.508ZM400.712 139.979H338.172C333.536 139.979 329.089 138.137 325.81 134.859C322.531 131.58 320.689 127.133 320.689 122.496C320.689 117.86 322.531 113.413 325.81 110.134C329.089 106.855 333.536 105.013 338.172 105.013H400.712C405.349 105.013 409.795 106.855 413.074 110.134C416.353 113.413 418.195 117.86 418.195 122.496C418.195 127.133 416.353 131.58 413.074 134.859C409.795 138.137 405.349 139.979 400.712 139.979ZM463.151 199.921H338.172C333.536 199.921 329.089 198.079 325.81 194.801C322.531 191.522 320.689 187.075 320.689 182.438C320.689 177.802 322.531 173.355 325.81 170.076C329.089 166.797 333.536 164.955 338.172 164.955H463.151C467.788 164.955 472.235 166.797 475.514 170.076C478.792 173.355 480.634 177.802 480.634 182.438C480.634 187.075 478.792 191.522 475.514 194.801C472.235 198.079 467.788 199.921 463.151 199.921ZM463.151 259.863H338.172C333.536 259.863 329.089 258.021 325.81 254.743C322.531 251.464 320.689 247.017 320.689 242.38C320.689 237.743 322.531 233.297 325.81 230.018C329.089 226.739 333.536 224.897 338.172 224.897H463.151C467.788 224.897 472.235 226.739 475.514 230.018C478.792 233.297 480.634 237.743 480.634 242.38C480.634 247.017 478.792 251.464 475.514 254.743C472.235 258.021 467.788 259.863 463.151 259.863ZM463.151 319.805H338.172C333.536 319.805 329.089 317.963 325.81 314.685C322.531 311.406 320.689 306.959 320.689 302.322C320.689 297.685 322.531 293.239 325.81 289.96C329.089 286.681 333.536 284.839 338.172 284.839H463.151C467.788 284.839 472.235 286.681 475.514 289.96C478.792 293.239 480.634 297.685 480.634 302.322C480.634 306.959 478.792 311.406 475.514 314.685C472.235 317.963 467.788 319.805 463.151 319.805Z"
              fill="#4F46A3"
            />
          </Svg>
        </View>
        <Text style={styles.userNote}>
          Note: This daily mood temperature is a representation of your mood
        </Text>
      </View>
      <View style={styles.tabHead}>
        <Text style={styles.subTitle}>Mood Chart</Text>
        <View style={styles.btnTabContainer}>
          <TouchableOpacity style={styles.btnTab}>
            <Text>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTab}>
            <Text>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTab}>
            <Text>Yearly</Text>
          </TouchableOpacity>
        </View>
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
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404444',
    marginBottom: 18,
  },
  svgTempContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgTemp: {
    marginBottom: 4,
  },
  userNote: {
    fontSize: 16,
    paddingHorizontal: 6,
    marginTop: 12,
    color: '#404444',
  },
  tabHead: {
    display: 'flex',
    width: '100%',
    marginTop: 24,
  },
  btnTabContainer: {
    flexDirection: 'row',
   //  justifyContent: 'space-between',
    marginTop: 12,
  },
  btnTab: {
    backgroundColor: '#4F46A3',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GraphicScreen;
