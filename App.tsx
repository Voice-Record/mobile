import { StyleSheet, View } from 'react-native';
import RecordView from "./RecordView"
// import PhoneNumber from "./PhoneNumber"


export default function App() {
  return (
    <View style={styles.container}>
      <RecordView />
      {/* <PhoneNumber /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
