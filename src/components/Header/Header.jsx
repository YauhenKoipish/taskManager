import PropTypes from 'prop-types';
import { Button } from '../Buttons/Button/Button';
import { logoutFirebase } from '../../services/services';

const hadleClick = () => {
  logoutFirebase();
};

export const Header = ({ userData }) => (
  <div className='header'>
    <div className='header__content'>
      <span className='header__content__text'> Dims-11</span>
      <div className='header__content__user'>
        <span className='header__content__user__name'>{userData.name}</span>
        <Button className='header__content__user__btn' onClick={hadleClick}>
          Logout
        </Button>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};
