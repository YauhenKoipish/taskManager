import { Component } from 'react';

import { Button } from '../components/Buttons/Button/Button';
import { isCorrectEmail, loginFirebase, isCorrectPassword } from '../services/services';

export class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      mailFlag: false,
      passwordFlag: false,
      authFlag: false,
    };
    this.inputChange = this.inputChange.bind(this);
    this.buttonHandleCLick = this.buttonHandleCLick.bind(this);
  }

  inputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async buttonHandleCLick() {
    const { email, password } = this.state;

    if (!isCorrectEmail(email)) {
      this.setState({ mailFlag: true });
    } else {
      this.setState({ mailFlag: false });
    }

    if (!isCorrectPassword(password)) {
      this.setState({ passwordFlag: true });
    } else {
      this.setState({ passwordFlag: false });
    }

    if (isCorrectPassword(password) && isCorrectEmail(email)) {
      const loginUser = await loginFirebase(email, password);
      if (!loginUser) {
        this.setState({ authFlag: true });
      }
    }
  }

  render() {
    const { mailFlag, passwordFlag, authFlag } = this.state;

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
              onChange={this.inputChange}
            />
            {mailFlag && <span className='login__container__row__error'>Email is not valid!</span>}
          </div>
          <div className='login__container__row'>
            <div className='login__container__row__desc'>Password</div>
            <input
              name='password'
              type='password'
              className='login__container__row__input'
              onChange={this.inputChange}
            />
            {passwordFlag && <span className='login__container__row__error'>Password is not valid!</span>}
          </div>

          <Button onClick={this.buttonHandleCLick} className='login__container__btn btn'>
            Login
          </Button>
          {authFlag && (
            <span className='login__container__row__error'>You entered an incorrect username or password!</span>
          )}
        </div>
      </div>
    );
  }
}
