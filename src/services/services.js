import firebase, { db, secondaryApp } from './firebase';

const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isCorrectEmail = (email) => regExp.test(email);

export const isCorrectPassword = ({ length }) => length >= 8;

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

export const deleteUserById = async (userId) => {
  const users = await db.collection('data').doc('users');
  const usersValidation = await db.collection('data').doc('usersValidation');

  await users.update({
    [userId]: firebase.firestore.FieldValue.delete(),
  });
  await usersValidation.update({
    [userId]: firebase.firestore.FieldValue.delete(),
  });
};

export const setUserData = async (userId, data) => {
  db.collection('data')
    .doc('users')
    .set(
      {
        [userId]: data,
      },
      { merge: true },
    )
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const getUserStatus = async () => {
  await firebase.auth().onAuthStateChanged((user) => Boolean(user));
};
export const getAllMembers = async () => {
  const docRef = await db.collection('data').doc('users');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data());
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
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
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const getUserValidation = async (userId) => {
  const docRef = await db.collection('data').doc('usersValidation');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[userId];
      }
      // doc.data() will be undefined in this case
      console.log('No such user data, with this ID!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
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
      // doc.data() will be undefined in this case
      console.log('No such user data, with this ID!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getRandomId = () => `${Math.random().toString(36).substr(2, 9)}`;

export const setTaskData = async (data) => {
  db.collection('data')
    .doc('tasks')
    .set(
      {
        [data.taskId]: data,
      },
      { merge: true },
    )
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const setUserSubTaskData = async (userId, taskId, data) => {
  db.collection('data')
    .doc('memberTasks')
    .set(
      {
        [userId]: { [taskId]: { [data.subTaskId]: data } },
      },
      { merge: true },
    )
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const deleteTaskById = async (taskId) => {
  const tasks = await db.collection('data').doc('tasks');
  await tasks.update({
    [taskId]: firebase.firestore.FieldValue.delete(),
  });
};

export const deleteSubTaskById = async (userId, taskId, subTaskId) => {
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
      // doc.data() will be undefined in this case
      console.log('No such user data, with this ID!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getSubTaskById = async (userId, taskId, subTaskId) => {
  const docRef = await db.collection('data').doc('memberTasks');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()[userId][taskId][subTaskId];
      }
      // doc.data() will be undefined in this case
      console.log('No such user data, with this ID!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getTasksDataById = async (id) => {
  const data = [];
  const docRef = await db.collection('data').doc('tasks');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const tasks = Object.values(doc.data());
        tasks.forEach((item) => {
          if (item.members[id] === true) {
            data.push(item);
          }
        });
      }
      return data;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getTaskTrackById = async (userId, taskId) => {
  const docRef = await db.collection('data').doc('memberTasks');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (doc.data()[userId]) {
          if (doc.data()[userId][taskId]) {
            return Object.values(doc.data()[userId][taskId]);
          }
        }
        return {};
      }
      console.log('No such user data, with this ID!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getMemberProgressById = async (id) => {
  const tasksData = await getTasksDataById(id);
  const subTasksData = [];
  const docRef = await db.collection('data').doc('memberTasks');

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const subTasks = Object.values(doc.data()[id] ? doc.data()[id] : doc.data());
        subTasks.forEach((item) => {
          Object.values(item).forEach((subTask) => {
            subTasksData.push(subTask);
          });
        });
      }
      tasksData.forEach((task) => {
        let flag = true;
        for (let i = 0; i < subTasksData.length; i += 1) {
          if (task.taskId === subTasksData[i].taskId) {
            flag = false;
          }
        }
        if (flag) {
          subTasksData.push(task);
        }
      });
      return subTasksData;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const getAllTasks = async () => {
  const docRef = await db.collection('data').doc('tasks');
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data());
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};
