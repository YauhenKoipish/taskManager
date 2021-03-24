import { getTaskById } from '../../services/services';
import { TASKS_WRITE_MEMBER_DATA, TASKS_CLEAR_MEMBER_DATA, TASKS_IS_READ_ONLY } from './actionTypes';

export function getTaskData(id) {
  return async (dispatch) => {
    const taskData = await getTaskById(id);
    dispatch(writeTaskData(taskData));
  };
}

export function writeTaskData(taskData) {
  return {
    type: TASKS_WRITE_MEMBER_DATA,
    payload: { taskData },
  };
}
export function clearData() {
  return {
    type: TASKS_CLEAR_MEMBER_DATA,
  };
}
export function setReadOnly() {
  return {
    type: TASKS_IS_READ_ONLY,
  };
}
