import firebase, { db, secondaryApp } from './firebase';

const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const sortArrayByName = (arr) => arr.sort((a, b) => (a.name > b.name ? 1 : -1));

export const phoneMask = {
  pattern: '(\\+?\\d[- .]*){12}',
  minLength: '13',
  maxLength: '13',
};
export const textMask = {
  pattern: '^[а-яА-Яa-zA-Z]+$',
  maxLength: '16',
};
export const ageMask = {
  pattern: '^[0-9]+$',
  min: '18',
  max: '99',
};
export const scoreMask = {
  pattern: '^[0-9]+$',
  min: '1',
  max: '100',
};
export const mailMask = {
  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
  maxLength: '26',
};

export const isCorrectEmail = (email) => regExp.test(email);

export const isCorrectPassword = ({ length }) => length >= 8;

const createSuccessfullyMessage = () => console.log('Document successfully written!');
const createIdErrorMessage = () => console.log('No such user data, with this ID!');
const createErrorWritingMessage = (error) => console.error('Error writing document: ', error);
const createErrorGettingMessage = (error) => console.log('Error getting document:', error);

export const loginFirebase = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

    return response;
  } catch (error) {
    return null;
  }
};

export const registerUser = async (email, password, displayName, emailVerified) => {
  await secondaryApp.auth().createUserWithEmailAndPassword(email, password);

  const user = await secondaryApp.auth().currentUser;

  if (user) {
    user.updateProfile({
      displayName,
      email,
      emailVerified,
    });
  }
  await secondaryApp.auth().sendPasswordResetEmail(email);
  const userId = user.uid;
  secondaryApp.auth().signOut();

  return userId;
};

export const getRealTimeUpdateData = (docName) =>
  db
    .collection('data')
    .doc(docName)
    .onSnapshot((doc) => Object.values(doc.data()));

export const deleteUserById = (userId) => async () => {
  const users = await db.collection('data').doc('users');
  const usersValidation = await db.collection('data').doc('usersValidation');

  await users.update({
    [userId]: firebase.firestore.FieldValue.delete(),
  });
  await usersValidation.update({
    [userId]: firebase.firestore.FieldValue.delete(),
  });
};

export const setUserData = async (data) => {
  db.collection('data')
    .doc('users')
    .set(
      {
        [data.userId]: data,
      },
      { merge: true },
    )
    .then(() => {
      createSuccessfullyMessage();
    })
    .catch(createErrorWritingMessage);
};

export const setUserTheme = async (theme, userId) => {
  const userData = await getUserById(userId);
  if (userData) {
    userData.theme = theme;
    db.collection('data')
      .doc('users')
      .set(
        {
          [userId]: userData,
        },
        { merge: true },
      )
      .then(() => {
        createSuccessfullyMessage();
      })
      .catch(createErrorWritingMessage);
  }
};

export const getAllMembers = async () => {
  const docRef = await db.collection('data').doc('users');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data());
      }
      console.log('No such document!');

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const setUserValidation = async (userId, value) => {
  db.collection('data')
    .doc('usersValidation')
    .set(
      {
        [userId]: value,
      },
      { merge: true },
    )
    .then(() => {
      createSuccessfullyMessage();
    })
    .catch(createErrorWritingMessage);
};

export const getUserValidation = async (userId) => {
  const docRef = await db.collection('data').doc('usersValidation');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[userId];
      }

      createIdErrorMessage();

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const logoutFirebase = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error with signout: ', error);
  }
};

export const getUserById = async (id) => {
  const docRef = await db.collection('data').doc('users');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[id];
      }
      createIdErrorMessage();

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const getRandomId = () => `${Math.random().toString(36).substr(2, 9)}`;

export const setTaskData = async (data) => {
  const { taskId } = data;

  db.collection('data')
    .doc('tasks')
    .set(
      {
        [taskId]: data,
      },
      { merge: true },
    )
    .then(() => {
      createSuccessfullyMessage();
    })
    .catch(createErrorWritingMessage);
};

export const setUserSubTaskData = async (data) => {
  const { userId, taskId, subTaskId } = data;

  db.collection('data')
    .doc('memberTasks')
    .set(
      {
        [userId]: { [taskId]: { [subTaskId]: data } },
      },
      { merge: true },
    )
    .then(() => {
      createSuccessfullyMessage();
    })
    .catch(createErrorWritingMessage);
};

export const deleteTaskById = (taskId) => async () => {
  const tasks = await db.collection('data').doc('tasks');
  await tasks.update({
    [taskId]: firebase.firestore.FieldValue.delete(),
  });
};

export const deleteSubTaskById = (userId, taskId, subTaskId) => async () => {
  const subTasks = await db.collection('data').doc('memberTasks');
  const userTasks = await subTasks.get().then((doc) => doc.data()[userId]);
  const userSubtasks = userTasks[taskId];
  delete userSubtasks[subTaskId];
  await subTasks.update({
    [userId]: userTasks,
  });
};

export const getTaskById = async (id) => {
  const docRef = await db.collection('data').doc('tasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[id];
      }
      createIdErrorMessage();

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const getSubTaskById = async (userId, taskId, subTaskId) => {
  const docRef = await db.collection('data').doc('memberTasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[userId][taskId][subTaskId];
      }
      createIdErrorMessage();

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const getTasksDataById = async (id) => {
  let data;
  const docRef = await db.collection('data').doc('tasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const tasks = Object.values(doc.data());
        data = tasks.filter((item) => item.members[id] === true);
      }

      return data;
    })
    .catch(createErrorGettingMessage);
};

export const getTaskTrackById = async (userId, taskId) => {
  const docRef = await db.collection('data').doc('memberTasks');

  return docRef
    .get()
    .then((doc) => {
      const userData = doc.data()[userId];
      if (userData && userData[taskId]) {
        return Object.values(userData[taskId]);
      }

      return {};
    })
    .catch(createErrorGettingMessage);
};

export const getMemberProgressById = async (id) => {
  const tasksData = await getTasksDataById(id);
  let subTasksData = [];
  const docRef = await db.collection('data').doc('memberTasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const subTasks = Object.values(doc.data()[id] ? doc.data()[id] : []);
        subTasks.forEach((item) => {
          subTasksData = [...Object.values(item)];
        });
      }

      subTasksData = [
        ...subTasksData,
        ...tasksData.filter((task) => {
          for (let i = 0; i < subTasksData.length; i += 1) {
            if (task.taskId === subTasksData[i].taskId) {
              return false;
            }
          }

          return true;
        }),
      ];

      return subTasksData;
    })
    .catch(createErrorGettingMessage);
};

export const getAllTasks = async () => {
  const docRef = await db.collection('data').doc('tasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data());
      }
      createIdErrorMessage();

      return null;
    })
    .catch(createErrorGettingMessage);
};

export const changeTaskStatus = (userId, taskId, status) => async () => {
  const taskData = await getTaskById(taskId);
  taskData.membersStatus[userId] = status;
  setTaskData(taskData);
};
