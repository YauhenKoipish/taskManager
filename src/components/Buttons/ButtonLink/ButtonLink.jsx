import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ButtonLink = ({ children, path, ...restProps }) => (
  <Link to={path} {...restProps}>
    {children}
  </Link>
);

ButtonLink.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
ButtonLink.defaultProps = {
  path: '/',
  children: null,
};
