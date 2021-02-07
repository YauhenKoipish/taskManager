import { APP_WRITE_USER_DATA, APP_IS_NOT_AUTH } from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  isDataLoad: false,
  userData: {},
  isVerified: false,
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

    case APP_IS_NOT_AUTH:
      return {
        ...state,
        isAuth: false,
        isDataLoad: true,
      };

    default:
      return state;
  }
}
