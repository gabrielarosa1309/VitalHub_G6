import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Modal } from 'react-native-web';

const Loader = () => (

        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
        </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;