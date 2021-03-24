import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '../components/Buttons/Button/Button';
import { setUserValidation, isCorrectPassword } from '../services/services';
import firebase from '../services/firebase';
import { getUserData } from '../store/actions/app';

export const PasswordChange = () => {
  const {
    app: {
      userData: { email },
    },
  } = useSelector((state) => state);

  const [data, setData] = useState({
    repeatPassword: '',
    password: '',
  });

  const [passwordFlag, setPasswordFlag] = useState(false);
  const [repeatPasswordFlag, setRepeatPasswordFlag] = useState(false);
  const dispatch = useDispatch();

  const handleCLick = async () => {
    const { password, repeatPassword } = data;

    if (!isCorrectPassword(password)) {
      setPasswordFlag(true);
    } else {
      setPasswordFlag(false);
    }
    if (!isCorrectPassword(repeatPassword) || password !== repeatPassword) {
      setRepeatPasswordFlag(true);
    } else {
      setRepeatPasswordFlag(false);
    }

    if (isCorrectPassword(password) && isCorrectPassword(repeatPassword) && password === repeatPassword) {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updatePassword(repeatPassword);
        await setUserValidation(user.uid, true);
        const userDataAction = getUserData();
        dispatch(userDataAction);
      }
    }
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__container__title'>Change password</div>
        <div className='login__container__row'>
          <span className='login__container__row__desc'>Email</span>
          <input readOnly type='email' placeholder={email} className='login__container__row__input' />
        </div>
        <div className='login__container__row'>
          <div className='login__container__row__desc'>New password</div>
          <input name='password' type='password' className='login__container__row__input' onChange={inputChange} />
          {passwordFlag && <span className='login__container__row__error'>Password is not valid!</span>}
        </div>
        <div className='login__container__row'>
          <div className='login__container__row__desc'>Repeat password</div>
          <input
            name='repeatPassword'
            type='password'
            className='login__container__row__input'
            onChange={inputChange}
          />
          {repeatPasswordFlag && (
            <span className='login__container__row__error'>Password is not valid or does not match!</span>
          )}
        </div>

        <Button onClick={handleCLick} className='login__container__btn btn'>
          Change
        </Button>
      </div>
    </div>
  );
};
