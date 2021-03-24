import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from './SideBar';
import { render } from '../../test-utils';

test('renders learn react link', () => {
  render(
    <Router>
      <SideBar />
    </Router>,
  );
  screen.debug();

  const linkElement = screen.getByText(/back/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.tagName).toBe('SPAN');
});
