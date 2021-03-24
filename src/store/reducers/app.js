import {
  APP_WRITE_USER_DATA,
  APP_IS_NOT_AUTH,
  APP_WRITE_TABLE_DATA,
  APP_SET_UNSUB_DATA,
  APP_TRACK_UNSUB,
} from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  isDataLoad: false,
  userData: {},
  isVerified: false,
  tasksData: [],
  membersData: [],
  unsubscribe: () => {},
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_WRITE_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isDataLoad: true,
      };
    case APP_WRITE_TABLE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case APP_IS_NOT_AUTH:
      return {
        ...state,
        isAuth: false,
        isDataLoad: true,
      };

    case APP_SET_UNSUB_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case APP_TRACK_UNSUB:
      state.unsubscribe();

      return state;

    default:
      return state;
  }
}
