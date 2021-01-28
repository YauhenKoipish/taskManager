import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(<Button>Hello DIMS!</Button>);
    const buttonText = getByText(/hello dims/i);

    expect(buttonText).toBeInTheDocument();
    expect(buttonText.tagName).toBe('BUTTON');
  });
});
