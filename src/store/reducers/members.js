import { MEMBERS_WRITE_MEMBER_DATA, MEMBERS_CLEAR_MEMBER_DATA, MEMBERS_IS_READ_ONLY } from '../actions/actionTypes';

const initialState = {
  memberData: null,
  isReadOnly: false,
  isEditMode: false,
};

export default function membersReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_WRITE_MEMBER_DATA:
      return {
        ...state,
        ...action.payload,
        isEditMode: true,
      };

    case MEMBERS_CLEAR_MEMBER_DATA:
      return {
        ...state,
        memberData: null,
        isReadOnly: false,
        isEditMode: false,
      };

    case MEMBERS_IS_READ_ONLY:
      return {
        ...state,
        isReadOnly: true,
      };

    default:
      return state;
  }
}
