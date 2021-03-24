import { Header } from './Header';
import { render } from '../../test-utils';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

test('renders learn react link', () => {
  const { getByText, debug } = render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );
  debug();

  const linkElement = getByText(/dims/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.tagName).toBe('SPAN');
});
