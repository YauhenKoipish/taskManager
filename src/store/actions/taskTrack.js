import { getSubTaskById } from '../../services/services';
import {
  TASK_TRACK_SET_SUBTASKS_DATA,
  TASK_TRACK_SET_SUBTASK_DATA,
  TASK_TRACK_SET_UNSUB_DATA,
  TASK_TRACK_SET_DATA_LOAD,
  TASK_TRACK_FORM_SHOW,
  TASK_TRACK_CLEAR_MEMBER_DATA,
  TASK_TRACK_SET_DETAIL_MODE,
  TASK_TRACK_UNSUB,
} from './actionTypes';
import { db } from '../../services/firebase';

export function getSubtasksData(userId, taskId) {
  return async (dispatch) => {
    const unsubscribe = db
      .collection('data')
      .doc('memberTasks')
      .onSnapshot((doc) => {
        const userData = doc.data()[userId];
        if (userData && userData[taskId]) {
          dispatch(setSubtasksData(Object.values(userData[taskId])));
        } else {
          dispatch(setDataLoad());
        }

        return {};
      });
    dispatch(setUnsubscribe(unsubscribe));
  };
}

export function getSubtaskData(userId, taskId, subTaskId) {
  return async (dispatch) => {
    const taskData = await getSubTaskById(userId, taskId, subTaskId);
    dispatch(setSubtaskData(taskData));
    dispatch(showForm());
  };
}

export function setSubtasksData(tasksData) {
  return {
    type: TASK_TRACK_SET_SUBTASKS_DATA,
    payload: { tasksData },
  };
}

export function setSubtaskData(taskData) {
  return {
    type: TASK_TRACK_SET_SUBTASK_DATA,
    payload: { taskData },
  };
}

export function setDataLoad() {
  return {
    type: TASK_TRACK_SET_DATA_LOAD,
  };
}

export function setUnsubscribe(unsubscribe) {
  return {
    type: TASK_TRACK_SET_UNSUB_DATA,
    payload: { unsubscribe },
  };
}

export function unsubscribeData() {
  return {
    type: TASK_TRACK_UNSUB,
  };
}

export function showForm() {
  return {
    type: TASK_TRACK_FORM_SHOW,
  };
}

export function clearData() {
  return {
    type: TASK_TRACK_CLEAR_MEMBER_DATA,
  };
}

export function setDetailMode() {
  return {
    type: TASK_TRACK_SET_DETAIL_MODE,
  };
}
