import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonLink } from './ButtonLink';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(
      <Router>
        <ButtonLink>Hello DIMS!</ButtonLink>
      </Router>,
    );
    const buttonText = getByText(/hello dims/i);

    expect(buttonText).toBeInTheDocument();
    expect(buttonText.tagName).toBe('A');
  });
});
