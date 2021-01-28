import { render } from '@testing-library/react';
import { SaveButton } from './SaveButton';

describe('SaveButton', () => {
  it('should show save by default', () => {
    const { getByText } = render(<SaveButton />);
    const buttonText = getByText(/save/i);
    expect(buttonText).toBeInTheDocument();
    expect(buttonText.tagName).toBe('BUTTON');
  });
});
