import { combineReducers } from 'redux';
import appReducer from './app';
import membersReducer from './members';
import tasksReducer from './tasks';
import memberProgressReducer from './memberProgress';
import memberTasksReducer from './memberTasks';
import taskTrackReducer from './taskTrack';

export default combineReducers({
  app: appReducer,
  members: membersReducer,
  tasks: tasksReducer,
  memberProgress: memberProgressReducer,
  memberTasks: memberTasksReducer,
  taskTrack: taskTrackReducer,
});
