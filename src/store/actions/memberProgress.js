import { getMemberProgressById, getUserById } from '../../services/services';
import { PROGRESS_WRITE_MEMBER_DATA, PROGRESS_WRITE_PROGRESS_DATA, PROGRESS_CLEAR_MEMBER_DATA } from './actionTypes';

export function getProgressData(id) {
  return async (dispatch) => {
    const tasksData = await getMemberProgressById(id);
    const selectedUser = await getUserById(id);
    if (tasksData) {
      dispatch(writeProgressData(tasksData));
    }
    if (selectedUser) {
      dispatch(writeSelectedMemberData(selectedUser));
    }
  };
}

export function writeSelectedMemberData(selectedUser) {
  return {
    type: PROGRESS_WRITE_MEMBER_DATA,
    payload: { selectedUser },
  };
}
export function clearData() {
  return {
    type: PROGRESS_CLEAR_MEMBER_DATA,
  };
}

export function writeProgressData(tasksData) {
  return {
    type: PROGRESS_WRITE_PROGRESS_DATA,
    payload: { tasksData },
  };
}
