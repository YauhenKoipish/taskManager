import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(<Footer />);
    const elementText = getByText(/dims-11/i);

    expect(elementText).toBeInTheDocument();
    expect(elementText.tagName).toBe('SPAN');
  });
});
