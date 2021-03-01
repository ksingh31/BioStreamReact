import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '0.5%',
    },
    button: {
      backgroundColor: 'aliceblue',
      borderWidth: 1,
      margin: '5%',
      padding: 8,
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#ddd',
    },
    switchButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 4,
      width: '99%',
    },
    scrollView: {
      marginHorizontal: '1%',
      marginBottom: '1%',
      borderWidth: 1,
      padding: 1,
    },
});

export { styles }