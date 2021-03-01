import React from 'react';
import AppDetails from './components/CompanyDetails/AppDetails';
import Info from './components/User/Details/Info';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import type { MSALResult, MSALWebviewParams } from 'react-native-msal';
import B2CClient from './stores/b2cClient';
import { b2cConfig, b2cScopes as scopes } from './stores/msalConfig';

// Import all locales
import en from './locales/en.json'
import de from './locales/de.json';
import { observer } from 'mobx-react';
import UserDetails from './components/User/Info/UserDetails';
import { Provider } from 'mobx-react';
import userStore from './stores/userStore';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageTag;
}

i18n.fallbacks = true;
i18n.translations = {
  en,
  de
};

const { Navigator, Screen } = createStackNavigator();
const b2cClient = new B2CClient(b2cConfig);

function App() {
  return (
    <AppController />
  );
}

function AppController() {
  const [authResult, setAuthResult] = React.useState<MSALResult | null>(null);
  const [iosEphemeralSession, setIosEphemeralSession] = React.useState(false);
  const webviewParameters: MSALWebviewParams = {
    ios_prefersEphemeralWebBrowserSession: iosEphemeralSession,
  };

  React.useEffect(() => {
    async function init() {
      const isSignedIn = await b2cClient.isSignedIn();
      if (isSignedIn) {
        setAuthResult(await b2cClient.acquireTokenSilent({ scopes }));
      }
      else {
        handleSignInPress();
      }
    }
    init();
  }, []);

  const handleSignInPress = async () => {
    try {
      const res = await b2cClient.signIn({ scopes, webviewParameters });
      setAuthResult(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleAcquireTokenPress = async () => {
    try {
      const res = await b2cClient.acquireTokenSilent({ scopes });
      setAuthResult(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSignoutPress = async () => {
    try {
      await b2cClient.signOut();
      setAuthResult(null);
    } catch (error) {
      console.warn(error);
    }
  };

  const constiosEphemeralSession  = () => {
    setIosEphemeralSession(!iosEphemeralSession)
  }

  return <AppView handleAcquireTokenPress = { handleAcquireTokenPress } constiosEphemeralSession = { constiosEphemeralSession } iosEphemeralSession = { iosEphemeralSession } authResult={authResult} handleSignInPress={handleSignInPress} handleSignoutPress={handleSignoutPress} />
}

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

export default observer(App);

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