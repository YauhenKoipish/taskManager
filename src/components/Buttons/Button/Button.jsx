import PropTypes from 'prop-types';
import noop from '../../../shared/noop';

export const Button = ({ children, onClick, ...restProps }) => (
  <button type='button' onClick={onClick} {...restProps}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
};
