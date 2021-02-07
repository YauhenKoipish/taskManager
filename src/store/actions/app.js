import firebase from '../../services/firebase';
import { getUserById, getUserValidation } from '../../services/services';
import { APP_WRITE_USER_DATA, APP_IS_NOT_AUTH } from './actionTypes';

export function getUserData() {
  return async (dispatch) => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const promise = Promise.all([getUserById(user.uid), getUserValidation(user.uid)]);
        promise.then(([userData, isVerified]) => {
          dispatch(writeData(isVerified, userData));
        });
      } else {
        dispatch(isNotAuth());
      }
    });
  };
}

export function writeData(isVerified, userData) {
  return {
    type: APP_WRITE_USER_DATA,
    payload: {
      isVerified,
      userData,
    },
  };
}

export function isNotAuth() {
  return {
    type: APP_IS_NOT_AUTH,
  };
}
