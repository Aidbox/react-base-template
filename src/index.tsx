import React from 'react';
import { render } from 'react-dom';

import { aidboxClient, AidboxContext } from './aidbox';
import Application from './application';

render(
  <AidboxContext.Provider value={aidboxClient}>
    <Application />
  </AidboxContext.Provider>,
  document.getElementById('app')
);
