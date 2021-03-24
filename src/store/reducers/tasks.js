import { TASKS_WRITE_MEMBER_DATA, TASKS_CLEAR_MEMBER_DATA, TASKS_IS_READ_ONLY } from '../actions/actionTypes';

const initialState = {
  taskData: null,
  isReadOnly: false,
  isEditMode: false,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_WRITE_MEMBER_DATA:
      return {
        ...state,
        ...action.payload,
        isEditMode: true,
      };

    case TASKS_CLEAR_MEMBER_DATA:
      return {
        ...state,
        taskData: null,
        isReadOnly: false,
        isEditMode: false,
      };

    case TASKS_IS_READ_ONLY:
      return {
        ...state,
        isReadOnly: true,
      };

    default:
      return state;
  }
}
