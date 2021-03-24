import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TableLine } from './TableLine';

describe('Button', () => {
  it('should show passed text', () => {
    const { getByText } = render(
      <Router>
        <TableLine name='TEST' number={0} />
      </Router>,
    );
    const elementText = getByText(/TEST/i);

    expect(elementText).toBeInTheDocument();
    expect(elementText.tagName).toBe('BUTTON');
  });
});
