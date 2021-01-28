import PropTypes, { bool } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, condition, redirectPath, ...rest }) => (
  <Route {...rest} render={() => (condition ? <Component {...rest} /> : <Redirect to={redirectPath} />)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  condition: bool.isRequired,
  redirectPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectPath: '/',
};

export default PrivateRoute;
