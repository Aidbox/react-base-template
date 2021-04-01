import { Header } from '@components/header/header';
import { render } from '@testing-library/react';
import React from 'react';

it('initial test', () => {
  render(<Header name="test" />);
  expect(Header).toBe(Header);
});
