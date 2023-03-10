// External
import { StyleSheet, Text, View } from 'react-native';

// Internal non-components
import Colors from '../constants/Colors.jsx';

const ResultsView = ({ resultsState }) => {
  return (
    <View style={styles.resultsView}>
      <Text
        style={styles.resultsText}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
      >
        {resultsState}
      </Text>
    </View>
  );
};

export default ResultsView;

const styles = StyleSheet.create({
  resultsView: {
    flex: 0.3,
    width: '95%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
    padding: 10,
  },
  resultsText: {
    fontSize: 60,
    color: Colors.text,
  },
});
