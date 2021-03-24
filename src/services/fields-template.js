import membersImg from '../components/SideBar/style/members.png';
import tasksImg from '../components/SideBar/style/tasks.png';

export const MEMBER = 'MEMBER';
export const ADMIN = 'ADMIN';
export const MENTOR = 'MENTOR';

export const memberFormDirectionsList = ['Java', '.Net', 'PHP', 'Frontend'];
export const memberFormRolesList = [ADMIN, MENTOR, MEMBER];

export const memberProgressFields = [
  ['name', 'Tasks'],
  ['note', 'Note'],
  ['date', 'Date'],
];

export const membersFields = [
  ['name', 'Full name'],
  ['direction', 'Direction'],
  ['education', 'Education'],
  ['start', 'Start'],
  ['age', 'Age'],
  ['btns', ''],
];

export const memberTasksFields = [
  ['name', 'Name'],
  ['start', 'Start'],
  ['deadLine', 'Deadline'],
  ['status', 'Status'],
  ['btnTask', ''],
];

export const tasksFields = [
  ['name', 'Tasks'],
  ['start', 'start'],
  ['deadLine', 'DeadLine'],
  ['btns', ''],
];

export const taskTracksFields = [
  ['name', 'Name'],
  ['note', 'Note'],
  ['date', 'Date'],
  ['btns', ''],
];

export const sideBarList = [
  { name: 'Members', path: '/members', img: membersImg },
  { name: 'Tasks', path: '/tasks', img: tasksImg },
];
