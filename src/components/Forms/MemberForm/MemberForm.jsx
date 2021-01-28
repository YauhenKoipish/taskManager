import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { Button } from '../../Buttons/Button/Button';
import { registerUser, setUserData, setUserValidation } from '../../../services/services';
import { nameGluing } from '../../../services/nameGluing';

const directionsList = ['Java', '.Net', 'PHP', 'Frontend'];
const rolesList = ['ADMIN', 'MENTOR', 'MEMBER'];

export class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      direction: '',
      email: '',
      sex: '',
      education: '',
      age: '',
      universityAverageScore: '',
      mathScore: '',
      address: '',
      mobilePhone: '',
      skype: '',
      startDate: '',
      role: '',
      password: '12345678',
      validated: false,
      userId: '',
    };
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentDidMount() {
    const { memberData } = this.props;

    if (memberData) {
      const {
        name,
        lastName,
        direction,
        email,
        sex,
        education,
        age,
        universityAverageScore,
        mathScore,
        address,
        mobilePhone,
        skype,
        startDate,
        validated,
        role,
        userId,
      } = memberData;

      this.setState({
        name,
        lastName,
        direction,
        email,
        sex,
        education,
        age,
        universityAverageScore,
        mathScore,
        address,
        mobilePhone,
        skype,
        startDate,
        validated,
        role,
        userId,
      });
    }
  }

  async submitForm(event) {
    const { email, password, name, lastName } = this.state;
    const { isEditMode, memberData, handleClickShowMemberForm } = this.props;
    let userId;
    const form = event.currentTarget;
    event.preventDefault();
    this.setState({ validated: true });
    if (form.checkValidity() === true) {
      const fullName = nameGluing(name, lastName);
      if (!isEditMode) {
        userId = await registerUser(email, password, fullName, false);
      } else {
        userId = memberData.userId;
      }
      if (userId) {
        this.setState({ userId });
        await setUserData(userId, this.state);
        await setUserValidation(userId, isEditMode);
      }

      handleClickShowMemberForm();
    }
  }

  inputChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  render() {
    const {
      name,
      lastName,
      direction,
      email,
      sex,
      education,
      age,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
      validated,
      role,
    } = this.state;
    const { handleClickShowMemberForm, handleClickClearMemberData, isReadOnly, isEditMode, memberData } = this.props;
    const formTitle =
      isReadOnly || isEditMode ? `Member -${nameGluing(memberData.name, memberData.lastName)}` : 'Add member';

    return (
      <div className='memberForm form'>
        <div className='memberForm__container form__container'>
          <div className='memberForm__container__title form__container__title'>{formTitle}</div>

          <Form noValidate validated={validated} onSubmit={this.submitForm}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='text'
                defaultValue={name}
              />
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='text'
                defaultValue={lastName}
              />
            </Form.Group>
            <Form.Group controlId='direction'>
              <Form.Label>Direction</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onBlur={this.inputChange}
                required
                as='select'
                defaultValue={direction}
              >
                {directionsList.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Control readOnly={isReadOnly} onBlur={this.inputChange} required as='select' defaultValue={role}>
                {rolesList.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                readOnly={isEditMode || isReadOnly}
                onChange={this.inputChange}
                required
                type='email'
                defaultValue={email}
              />
            </Form.Group>
            <Form.Group controlId='sex'>
              <Form.Label>Sex</Form.Label>
              <Form.Control readOnly={isReadOnly} onBlur={this.inputChange} required as='select' defaultValue={sex}>
                <option>Male</option>
                <option>Famale</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='education'>
              <Form.Label>Education</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='text'
                defaultValue={education}
              />
            </Form.Group>
            <Form.Group controlId='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='number'
                defaultValue={age}
              />
            </Form.Group>
            <Form.Group controlId='universityAverageScore'>
              <Form.Label>University average score</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='number'
                defaultValue={universityAverageScore}
              />
            </Form.Group>
            <Form.Group controlId='mathScore'>
              <Form.Label>Math score</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='number'
                defaultValue={mathScore}
              />
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='text'
                defaultValue={address}
              />
            </Form.Group>
            <Form.Group controlId='mobilePhone'>
              <Form.Label>Mobile phone</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='tel'
                defaultValue={mobilePhone}
              />
            </Form.Group>
            <Form.Group controlId='skype'>
              <Form.Label>Skype</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='email'
                defaultValue={skype}
              />
            </Form.Group>
            <Form.Group controlId='startDate'>
              <Form.Label>startDate</Form.Label>
              <Form.Control
                readOnly={isReadOnly}
                onChange={this.inputChange}
                required
                type='date'
                defaultValue={startDate}
              />
            </Form.Group>
            <div className='memberForm__container__row'>
              {!isReadOnly && (
                <Button type='submit' className='btn btn-green '>
                  Save
                </Button>
              )}
              <Button
                onClick={() => {
                  handleClickClearMemberData();
                  handleClickShowMemberForm();
                }}
                className='btn btn-white '
              >
                Back to grid
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

MemberForm.propTypes = {
  handleClickShowMemberForm: PropTypes.func.isRequired,
  handleClickClearMemberData: PropTypes.func.isRequired,
  memberData: PropTypes.objectOf(PropTypes.any),
  isReadOnly: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

MemberForm.defaultProps = {
  memberData: null,
};
