import {
  MEMBER_TASKS_WRITE_MEMBER_DATA,
  MEMBER_TASKS_WRITE_TASKS_DATA,
  MEMBER_TASKS_SHOW_FORM,
  MEMBER_TASKS_SET_TASK_DATA,
} from '../actions/actionTypes';

const initialState = {
  tasksData: [],
  isDataLoad: false,
  selectedUser: {},
  tasksTrackFormActive: false,
  taskId: '',
  taskName: '',
};

export default function memberTasksReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_TASKS_WRITE_MEMBER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case MEMBER_TASKS_WRITE_TASKS_DATA:
      return {
        ...state,
        ...action.payload,
        isDataLoad: true,
      };
    case MEMBER_TASKS_SHOW_FORM:
      return {
        ...state,

        tasksTrackFormActive: !state.tasksTrackFormActive,
      };
    case MEMBER_TASKS_SET_TASK_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
