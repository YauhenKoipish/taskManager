import { render } from '@testing-library/react';
import { TableNav } from './TableNav';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(<TableNav tableNavigationFields={[['name', 'name']]} />);
    const elementText = getByText(/name/i);

    expect(elementText).toBeInTheDocument();
    expect(elementText.tagName).toBe('DIV');
  });
});
