import {
  TASK_TRACK_SET_SUBTASK_DATA,
  TASK_TRACK_SET_DATA_LOAD,
  TASK_TRACK_SET_UNSUB_DATA,
  TASK_TRACK_SET_SUBTASKS_DATA,
  TASK_TRACK_FORM_SHOW,
  TASK_TRACK_CLEAR_MEMBER_DATA,
  TASK_TRACK_SET_DETAIL_MODE,
  TASK_TRACK_UNSUB,
} from '../actions/actionTypes';

const initialState = {
  taskData: null,
  isReadOnly: false,
  isEditMode: false,
  tasksData: [],
  isDataLoad: false,
  unsubscribe: () => {},
  tasksTrackFormActive: false,
};

export default function taskTrackReducer(state = initialState, action) {
  switch (action.type) {
    case TASK_TRACK_SET_SUBTASKS_DATA:
      return {
        ...state,
        ...action.payload,
        isDataLoad: true,
      };

    case TASK_TRACK_SET_SUBTASK_DATA:
      return {
        ...state,
        ...action.payload,
        isEditMode: true,
      };

    case TASK_TRACK_SET_DATA_LOAD:
      return {
        ...state,
        isDataLoad: true,
      };

    case TASK_TRACK_SET_UNSUB_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case TASK_TRACK_FORM_SHOW:
      return {
        ...state,
        tasksTrackFormActive: !state.tasksTrackFormActive,
      };

    case TASK_TRACK_CLEAR_MEMBER_DATA:
      return {
        ...state,
        taskData: null,
        isReadOnly: false,
        isEditMode: false,
      };

    case TASK_TRACK_SET_DETAIL_MODE:
      return {
        ...state,

        isReadOnly: true,
      };

    case TASK_TRACK_UNSUB: {
      state.unsubscribe();

      return state;
    }

    default:
      return state;
  }
}
