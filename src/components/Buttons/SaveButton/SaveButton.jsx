import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

export const SaveButton = ({ children }) => <Button>{children}</Button>;

SaveButton.propTypes = {
  children: PropTypes.node,
};
SaveButton.defaultProps = {
  children: 'Save',
};
