import { useState } from 'react';
import { Button } from '../components/Buttons/Button/Button';
import { isCorrectEmail, loginFirebase, isCorrectPassword } from '../services/services';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [mailFlag, setMailFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [authFlag, setAuthFlag] = useState(false);

  const inputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const buttonHandleCLick = async () => {
    const { email, password } = data;

    if (!isCorrectEmail(email)) {
      setMailFlag(true);
    } else {
      setMailFlag(false);
    }

    if (!isCorrectPassword(password)) {
      setPasswordFlag(true);
    } else {
      setPasswordFlag(false);
    }

    if (isCorrectPassword(password) && isCorrectEmail(email)) {
      const loginUser = await loginFirebase(email, password);
      if (!loginUser) {
        setAuthFlag(true);
      }
    }
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__container__title'>Login</div>
        <div className='login__container__row'>
          <span className='login__container__row__desc'>Email</span>
          <input
            name='email'
            type='email'
            placeholder='expamlple@gmail.com'
            className='login__container__row__input'
            onChange={inputChange}
          />
          {mailFlag && <span className='login__container__row__error'>Email is not valid!</span>}
        </div>
        <div className='login__container__row'>
          <div className='login__container__row__desc'>Password</div>
          <input name='password' type='password' className='login__container__row__input' onChange={inputChange} />
          {passwordFlag && <span className='login__container__row__error'>Password is not valid!</span>}
        </div>

        <Button onClick={buttonHandleCLick} className='login__container__btn btn'>
          Login
        </Button>
        {authFlag && (
          <span className='login__container__row__error'>You entered an incorrect username or password!</span>
        )}
      </div>
    </div>
  );
};
