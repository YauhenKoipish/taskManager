import { render } from '@testing-library/react';
import EmptyData from './EmptyData';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(<EmptyData />);
    const elementText = getByText(/this user has no tasks!/i);

    expect(elementText).toBeInTheDocument();
    expect(elementText.tagName).toBe('DIV');
  });
});
