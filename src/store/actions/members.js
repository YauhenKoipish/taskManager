import { getUserById } from '../../services/services';
import { MEMBERS_WRITE_MEMBER_DATA, MEMBERS_CLEAR_MEMBER_DATA, MEMBERS_IS_READ_ONLY } from './actionTypes';

export function getMemberData(id) {
  return async (dispatch) => {
    const memberData = await getUserById(id);
    dispatch(writeMemberData(memberData));
  };
}

export function writeMemberData(memberData) {
  return {
    type: MEMBERS_WRITE_MEMBER_DATA,
    payload: { memberData },
  };
}
export function clearData() {
  return {
    type: MEMBERS_CLEAR_MEMBER_DATA,
  };
}
export function setReadOnly() {
  return {
    type: MEMBERS_IS_READ_ONLY,
  };
}
