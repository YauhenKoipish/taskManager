import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import { Button } from '../components/Buttons/Button/Button';
import { setUserValidation, isCorrectPassword } from '../services/services';
import firebase from '../services/firebase';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
      passwordFlag: false,
      repeatPasswordFlag: false,
    };
    this.inputChange = this.inputChange.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  async handleCLick() {
    const { repeatPassword, password } = this.state;
    const { history } = this.props;

    if (!isCorrectPassword(password)) {
      this.setState({ passwordFlag: true });
    } else {
      this.setState({ passwordFlag: false });
    }
    if (!isCorrectPassword(repeatPassword) && password !== repeatPassword) {
      this.setState({ repeatPasswordFlag: true });
    } else {
      this.setState({ repeatPasswordFlag: false });
    }

    if (isCorrectPassword(password) && isCorrectPassword(repeatPassword) && password === repeatPassword) {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updatePassword(repeatPassword);
        await setUserValidation(user.uid, true);
        history.push('/members');
      }
    }
  }

  inputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { passwordFlag, repeatPasswordFlag } = this.state;
    const { userData } = this.props;

    return (
      <div className='login'>
        <div className='login__container'>
          <div className='login__container__title'>Change password</div>
          <div className='login__container__row'>
            <span className='login__container__row__desc'>Email</span>
            <input readOnly type='email' placeholder={userData.email} className='login__container__row__input' />
          </div>
          <div className='login__container__row'>
            <div className='login__container__row__desc'>New password</div>
            <input
              name='password'
              type='password'
              className='login__container__row__input'
              onChange={this.inputChange}
            />
            {passwordFlag && <span className='login__container__row__error'>Password is not valid!</span>}
          </div>
          <div className='login__container__row'>
            <div className='login__container__row__desc'>Repeat password</div>
            <input
              name='repeatPassword'
              type='password'
              className='login__container__row__input'
              onChange={this.inputChange}
            />
            {repeatPasswordFlag && (
              <span className='login__container__row__error'>Password is not valid or does not match!</span>
            )}
          </div>

          <Button onClick={this.handleCLick} className='login__container__btn btn'>
            Change
          </Button>
        </div>
      </div>
    );
  }
}
PasswordChange.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(PasswordChange);
