import {
  MEMBER_FORM_SET_MEMBER_DATA,
  MEMBER_FORM_SET_USER_ID,
  MEMBER_FORM_SET_INPUT_CHANGE,
} from '../../../store/actions/actionTypes';

const handlers = {
  [MEMBER_FORM_SET_MEMBER_DATA]: (state, action) => {
    return { ...state, ...action.payload };
  },

  [MEMBER_FORM_SET_USER_ID]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [MEMBER_FORM_SET_INPUT_CHANGE]: (state, action) => {
    return { ...state, ...action.payload };
  },

  DEFAULT: (state) => state,
};

export const memberFormReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
