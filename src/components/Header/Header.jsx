/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Buttons/Button/Button';
import { logoutFirebase } from '../../services/services';
import { createFullName } from '../../services/createFullName';

const themes = ['default', 'dark', 'light', 'colored'];

export const Header = () => {
  const {
    app: {
      userData: { name, lastName, userId },
    },
  } = useSelector((state) => state);
  const [popup, setPopup] = useState(false);

  const { theme, saveUserTheme } = useTheme();

  const showPopMenu = () => {
    setPopup((prev) => !prev);
  };

  const hadleClick = () => {
    logoutFirebase();
  };

  return (
    <div className='header'>
      <div className='header__content'>
        <span className='header__content__text'> Dims-11</span>
        <div className='header__content__user'>
          <Button className='header__content__user__btn header__content__popup' onClick={showPopMenu}>
            Theme
            {popup && (
              <div className='popup'>
                {themes.map((item) => (
                  <div
                    key={item}
                    className={`popup__elem  ${item === theme && 'active'}`}
                    onClick={saveUserTheme(item, userId)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Button>
          <span className='header__content__user__name'>{createFullName(name, lastName)}</span>
          <Button className='header__content__user__btn' onClick={hadleClick}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
