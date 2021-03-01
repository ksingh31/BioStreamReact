import React from 'react';

import type { MSALResult, MSALWebviewParams } from 'react-native-msal';
import B2CClient from '../../stores/b2cClient';
import AppView from './AppView';
import { b2cConfig, b2cScopes as scopes } from '../../stores/msalConfig';

const b2cClient = new B2CClient(b2cConfig);

export default function AppController() {
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