import { auth } from '@store/auth';
import React from 'react';

import css from './header.module.scss';

interface Props {
  name: string;
}

export const Header: React.FC<Props> = ({ name }) => {
  return (
    <div className={css.header}>
      text {auth} {name} 234567
    </div>
  );
};
