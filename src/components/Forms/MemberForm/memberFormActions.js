import {
  MEMBER_FORM_SET_MEMBER_DATA,
  MEMBER_FORM_SET_USER_ID,
  MEMBER_FORM_SET_INPUT_CHANGE,
} from '../../../store/actions/actionTypes';

export function setMemberData(data) {
  return {
    type: MEMBER_FORM_SET_MEMBER_DATA,
    payload: { ...data },
  };
}
export function setuserId(userId) {
  return {
    type: MEMBER_FORM_SET_USER_ID,
    payload: { userId },
  };
}
export function setInputChange(id, value) {
  return {
    type: MEMBER_FORM_SET_INPUT_CHANGE,
    payload: { [id]: value },
  };
}
