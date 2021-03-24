import { getTasksDataById, getUserById, changeTaskStatus, sortArrayByName } from '../../services/services';
import {
  MEMBER_TASKS_SET_TASK_DATA,
  MEMBER_TASKS_SHOW_FORM,
  MEMBER_TASKS_WRITE_TASKS_DATA,
  MEMBER_TASKS_WRITE_MEMBER_DATA,
} from './actionTypes';

export function getTasksData(id) {
  return async (dispatch) => {
    const tasksData = await getTasksDataById(id);
    const selectedUser = await getUserById(id);
    if (tasksData) {
      dispatch(writeTaskssData(sortArrayByName(tasksData)));
    }
    if (selectedUser) {
      dispatch(writeSelectedMemberData(selectedUser));
    }
  };
}
export const changeStatus = (userId, taskId, status) => (dispatch) => async () => {
  await changeTaskStatus(userId, taskId, status)();
  const tasksData = await getTasksDataById(userId);

  dispatch(writeTaskssData(sortArrayByName(tasksData)));
};

export function writeSelectedMemberData(selectedUser) {
  return {
    type: MEMBER_TASKS_WRITE_MEMBER_DATA,
    payload: { selectedUser },
  };
}

export function writeTaskssData(tasksData) {
  return {
    type: MEMBER_TASKS_WRITE_TASKS_DATA,
    payload: { tasksData },
  };
}

export function showForm() {
  return {
    type: MEMBER_TASKS_SHOW_FORM,
  };
}

export function setTaskData(taskId, taskName) {
  return {
    type: MEMBER_TASKS_SET_TASK_DATA,
    payload: { taskId, taskName },
  };
}
