import {
  PROGRESS_WRITE_MEMBER_DATA,
  PROGRESS_WRITE_PROGRESS_DATA,
  PROGRESS_CLEAR_MEMBER_DATA,
} from '../actions/actionTypes';

const initialState = {
  tasksData: [],
  isDataLoad: false,
  selectedUser: {},
};

export default function memberProgressReducer(state = initialState, action) {
  switch (action.type) {
    case PROGRESS_WRITE_MEMBER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case PROGRESS_WRITE_PROGRESS_DATA:
      return {
        ...state,
        ...action.payload,
        isDataLoad: true,
      };

    case PROGRESS_CLEAR_MEMBER_DATA:
      return initialState;

    default:
      return state;
  }
}
