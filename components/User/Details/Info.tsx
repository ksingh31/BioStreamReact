import React from 'react';
import { styles } from './styles';
import { SafeAreaView, ScrollView, View, Text, StatusBar, Button } 
from 'react-native';

import { Header } from 'react-native/Libraries/NewAppScreen';
import UserDetails from '../Info/UserDetails';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { observer } from 'mobx-react';
import userStore from '../../../stores/userStore';

function Info() {
  return (
    <InfoView />
  )
}

const InfoView = observer(() => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
            <Text>
              <Button onPress={userStore.updateUser} title="Update Name" color="#841584" />
            </Text>
            <Text>
              {'\n'}
              { i18n.t('welcome') }
              {'\n'}
              {userStore.name}
              {'\n'}
              <UserDetails />
              {'\n'}{'\n'}
              <Button onPress={() => navigation.navigate("Details") } title="Go To Details Page" color="#841584" />
              {'\n'}{'\n'}
            </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
});

export default observer(Info)