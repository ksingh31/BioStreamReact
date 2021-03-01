import React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import userStore from '../../../stores/userStore';
import { styles } from './styles';

function UserDetails () {
  return (
    <UserDetailsView />
  )
}

const UserDetailsView = observer(() => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{ userStore.user?.name }</Text>
      <Text style={styles.sectionDescription}>
        { userStore.user?.description }
      </Text>
    </View>
  )
});

export default observer(UserDetails)