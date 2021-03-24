import firebase, { db } from '../../services/firebase';
import { getUserById, getUserValidation, sortArrayByName } from '../../services/services';
import {
  APP_WRITE_USER_DATA,
  APP_IS_NOT_AUTH,
  APP_WRITE_TABLE_DATA,
  APP_SET_UNSUB_DATA,
  APP_TRACK_UNSUB,
} from './actionTypes';

export const getUserData = () => (dispatch) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const [userData, isVerified] = await Promise.all([getUserById(user.uid), getUserValidation(user.uid)]);
        dispatch(writeData(isVerified, userData));

        dispatch(getSnapshot('users', 'membersData'));
        dispatch(getSnapshot('tasks', 'tasksData'));
      } else {
        dispatch(isNotAuth());
      }
    } catch (error) {
      console.error(error);

      return error;
    }
    dispatch(setUnsubscribe(unsubscribe));

    return undefined;
  });
};

export function setUnsubscribe(unsubscribe) {
  return {
    type: APP_SET_UNSUB_DATA,
    payload: { unsubscribe },
  };
}

export function unsubscribeData() {
  return {
    type: APP_TRACK_UNSUB,
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

export function getSnapshot(container, storeField) {
  return (dispatch) => {
    db.collection('data')
      .doc(container)
      .onSnapshot((doc) => {
        dispatch(writeSnapshotData(sortArrayByName(Object.values(doc.data())), storeField));
      });
  };
}

export function writeSnapshotData(membersData, storeField) {
  return {
    type: APP_WRITE_TABLE_DATA,
    payload: { [storeField]: membersData },
  };
}

export function isNotAuth() {
  return {
    type: APP_IS_NOT_AUTH,
  };
}
