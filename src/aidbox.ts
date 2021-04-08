import Aidbox from '@aidbox/client-sdk-js';
import { TPublicAPI as AidboxClient } from '@aidbox/client-sdk-js/build/module/lib/client';
import React from 'react';

export const aidboxClient = Aidbox.initializeInstance(
  {
    URL: 'http://localhost:8888',
    CLIENT_ID: 'root',
    CLIENT_SECRET: 'secret',
    AUTH_MODE: 0,
    FHIR_STRICT: false,
    SCOPE: '*',
  },
  {
    insertIntoStorage: localStorage.setItem.bind(localStorage),
    obtainFromStorage: localStorage.getItem.bind(localStorage) as any,
  }
) as AidboxClient;

if (aidboxClient instanceof Error) {
  throw aidboxClient;
}

export const AidboxContext = React.createContext<AidboxClient>(aidboxClient);
