import { screen } from '@testing-library/react';
import { App } from './App';
import { render } from '../test-utils';
import firebase from '../services/firebase';
import { ThemeProvider } from '../components/ThemeProvider/ThemeProvider';

jest.mock('firebase');

test('renders learn react link', () => {
  firebase.auth = jest.fn(() => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
  }));

  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
  screen.debug();
  const linkElement = screen.getByText(/dims/i);
  expect(linkElement).toBeInTheDocument();
});
