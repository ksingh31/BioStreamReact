import { Platform, StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
      width: 800,
      flexWrap: 'wrap',
      // Platform specific Targeting
      ...Platform.select({
        ios: {
          backgroundColor: '#fff',
        },
        android: {
          backgroundColor: '#fff',
        },
      }),
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
});

export { styles }