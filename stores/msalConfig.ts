import type { B2CConfiguration } from './b2cClient';

export const b2cConfig: B2CConfiguration = {
  auth: {
    clientId: '7f30ed1a-db88-42c8-91df-b15f915d0386',
    authorityBase: 'https://biostreamdiagnostics.b2clogin.com/tfp/biostreamdiagnostics.onmicrosoft.com',
    policies: {
      signInSignUp: 'B2C_1_SignUp_SignIn',
    },
  },
  // web only:
  cache: { cacheLocation: 'localStorage' },
};

export const b2cScopes = ['https://biostreamdiagnostics.onmicrosoft.com/api/demo.read'];