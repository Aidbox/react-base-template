import Header from '@components/header';
import React from 'react';

import css from './application.module.scss';

const Application = () => {
  const [state, set] = React.useState(1);
  return (
    <div className={css.main}>
      <Header name="hello" />
      HEADER {state} <button onClick={() => set(state + 1)}>click1</button>
    </div>
  );
};

export default Application;
