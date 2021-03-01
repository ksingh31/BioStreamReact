import React from 'react';
import AppDetails from '../CompanyDetails/AppDetails';
import Info from '../User/Details/Info';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import UserDetails from '../User/Info/UserDetails';
import { Provider } from 'mobx-react';
import userStore from '../../stores/userStore';
import { Platform, Switch, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const { Navigator, Screen } = createStackNavigator();

const AppView = observer((props: any) => {
    return (
      <>
        {props.authResult ? (
            <>
              <Provider userStore={userStore}>
                <NavigationContainer>
                  <Navigator>
                    <Screen name="Home" component={ Info } options={({ route }) => ({ title: route.name })} />
                    <Screen name="Details" component={ AppDetails } options={({ route }) => ({ title: route.name })} />
                    <Screen name="userDetails" component={ UserDetails } options={({ route }) => ({ title: route.name })} />
                  </Navigator>
                </NavigationContainer>
              </Provider>
              {/* <TouchableOpacity style={styles.button} onPress={handleAcquireTokenPress}>
                <Text>Acquire Token (Silent)</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.button} onPress={props.handleSignoutPress}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={props.handleSignInPress}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          )}
  
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              style={[styles.button, styles.switchButton]}
              onPress={props.handleIosEphemeralSession }
            >
              <Text>Prefer ephemeral browser session (iOS only)</Text>
              <Switch value={props.iosEphemeralSession} onValueChange={props.setIosEphemeralSession} />
            </TouchableOpacity>
          ) : null}
        </>
    );
});

export default AppView