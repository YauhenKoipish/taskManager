/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useEffect, useState, useReducer } from 'react';
import { Button } from '../../Buttons/Button/Button';
import {
  phoneMask,
  registerUser,
  setUserData,
  setUserValidation,
  textMask,
  mailMask,
  ageMask,
  scoreMask,
} from '../../../services/services';
import { createFullName } from '../../../services/createFullName';
import SelectControl from '../components/SelectControl/SelectControl';
import LabelControl from '../components/LabelControl/LabelControl';
import { memberFormRolesList, memberFormDirectionsList } from '../../../services/fields-template';
import { memberFormReducer } from './memberFormReducer';
import { setMemberData, setuserId, setInputChange } from './memberFormActions';

const initialState = {
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
  theme: 'default',
  password: '12345678',
  userId: '',
};

export const MemberForm = ({ handleClickShowMemberForm, handleClickClearMemberData }) => {
  const [data, dispatch] = useReducer(memberFormReducer, initialState, () => initialState);
  const [validated, setValidated] = useState(false);
  const [isRegisterUser, setIsRegisterUser] = useState(false);

  const {
    members: { memberData, isEditMode, isReadOnly },
  } = useSelector((state) => state);

  useEffect(() => {
    if (memberData) {
      dispatch(setMemberData(memberData));
      setValidated(true);
    }
  }, [memberData]);

  useEffect(() => {
    if (isRegisterUser) {
      setUserData(data);
      setUserValidation(data.userId, isEditMode);
      handleClickBackToGrid();
    }
  }, [isRegisterUser]);

  const handleClickBackToGrid = () => {
    handleClickClearMemberData();
    handleClickShowMemberForm();
  };

  const submitForm = async (event) => {
    const { currentTarget } = event;
    const { email, password, name, lastName } = data;

    event.preventDefault();
    setValidated(true);

    if (currentTarget.checkValidity()) {
      const fullName = createFullName(name, lastName);
      const userId = isEditMode ? memberData.userId : await registerUser(email, password, fullName, false);

      if (userId) {
        dispatch(setuserId(userId));
        setIsRegisterUser(true);
      }
    }
  };

  const inputChange = (event) => {
    const { id, value } = event.target;

    dispatch(setInputChange(id, value));
  };

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
    role,
  } = data;
  const formTitle =
    isReadOnly || isEditMode ? `Member -${createFullName(memberData.name, memberData.lastName)}` : 'Add member';

  return (
    <div className='memberForm form'>
      <div className='memberForm__container form__container'>
        <div className='memberForm__container__title form__container__title'>{formTitle}</div>

        <Form noValidate validated={validated} onSubmit={submitForm}>
          <LabelControl
            controlId='name'
            labelText='Name'
            feedbackText='Is incorected name'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            defaultValue={name}
            {...textMask}
          />
          <LabelControl
            controlId='lastName'
            labelText='Last name'
            feedbackText='Is incorected last name'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            defaultValue={lastName}
            {...textMask}
          />
          <Form.Group controlId='direction'>
            <Form.Label>Direction</Form.Label>
            <SelectControl
              readOnly={isReadOnly}
              array={memberFormDirectionsList}
              defaultValue={direction}
              onChangeFunc={inputChange}
            />
          </Form.Group>
          <Form.Group controlId='role'>
            <Form.Label>Role</Form.Label>
            <SelectControl
              readOnly={isReadOnly}
              array={memberFormRolesList}
              defaultValue={role}
              onChangeFunc={inputChange}
            />
          </Form.Group>
          <LabelControl
            controlId='email'
            labelText='Email'
            feedbackText='Is incorected Email'
            readOnly={isEditMode || isReadOnly}
            onChangeFunc={inputChange}
            type='email'
            defaultValue={email}
            {...mailMask}
          />
          <Form.Group controlId='sex'>
            <Form.Label>Sex</Form.Label>
            <SelectControl
              readOnly={isReadOnly}
              array={['Male', 'Famale']}
              defaultValue={sex}
              onChangeFunc={inputChange}
            />
          </Form.Group>
          <LabelControl
            controlId='education'
            labelText='Education'
            feedbackText='Is incorected value'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            defaultValue={education}
            {...textMask}
          />
          <LabelControl
            controlId='age'
            labelText='Age'
            feedbackText='Is incorected age must be 18-99'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            type='number'
            defaultValue={age}
            {...ageMask}
          />
          <LabelControl
            controlId='universityAverageScore'
            labelText='University average score'
            feedbackText='Is incorected score must be 1-100'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            type='number'
            defaultValue={universityAverageScore}
            {...scoreMask}
          />
          <LabelControl
            controlId='mathScore'
            labelText='Math score'
            feedbackText='Is incorected score must be 1-100'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            type='number'
            defaultValue={mathScore}
            {...scoreMask}
          />
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control readOnly={isReadOnly} onChange={inputChange} required type='text' defaultValue={address} />
          </Form.Group>
          <LabelControl
            controlId='mobilePhone'
            labelText='Mobile phone'
            feedbackText='Is incorected phone number'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            type='tel'
            defaultValue={mobilePhone}
            {...phoneMask}
          />
          <LabelControl
            controlId='skype'
            labelText='Skype'
            feedbackText='Is incorected skype email'
            readOnly={isReadOnly}
            onChangeFunc={inputChange}
            type='email'
            defaultValue={skype}
            {...mailMask}
          />
          <Form.Group controlId='startDate'>
            <Form.Label>startDate</Form.Label>
            <Form.Control readOnly={isReadOnly} onChange={inputChange} required type='date' defaultValue={startDate} />
          </Form.Group>
          <div className='memberForm__container__row'>
            {!isReadOnly && (
              <Button type='submit' className='btn btn-green '>
                Save
              </Button>
            )}
            <Button onClick={handleClickBackToGrid} className='btn btn-white '>
              Back to grid
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

MemberForm.propTypes = {
  handleClickShowMemberForm: PropTypes.func.isRequired,
  handleClickClearMemberData: PropTypes.func.isRequired,
};
