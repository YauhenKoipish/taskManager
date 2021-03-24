import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { tasksFields } from '../services/fields-template';
import TaskForm from '../components/Forms/TaskForm/TaskForm';
import { deleteTaskById } from '../services/services';
import { getTaskData, clearData, setReadOnly } from '../store/actions/tasks';

export const Tasks = () => {
  const {
    app: { tasksData },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [tasksFormActive, setTasksFormActive] = useState(false);

  const handleClickShowTaskForm = () => {
    setTasksFormActive(!tasksFormActive);
  };

  const handleClickSetTasksData = (id) => async () => {
    await dispatch(getTaskData(id));
    handleClickShowTaskForm();
  };

  const handleClickDetailTasks = (id) => () => {
    dispatch(setReadOnly());
    handleClickSetTasksData(id)();
  };

  const handleClickClearTasksData = () => {
    dispatch(clearData());
  };

  return (
    <div className='tasks wrapper'>
      <SideBar />
      <div className='tasks__container'>
        <Header />
        <div className='tasks__container__btn'>
          <Button onClick={handleClickShowTaskForm} className='btn'>
            Create
          </Button>
        </div>
        <div className='tasks__container__nav'>
          <TableNav tableNavigationFields={tasksFields} />
        </div>
        <div className='tasks__container__table'>
          {tasksData.map(({ name, startDate, deadlineDate, taskId }, index) => (
            <TableLine
              key={name + startDate}
              number={index + 1}
              name={name}
              start={startDate}
              deadLine={deadlineDate}
              handleClick={handleClickDetailTasks(taskId)}
            >
              <Button onClick={handleClickSetTasksData(taskId)} className='btn btn-line '>
                Edit
              </Button>
              <Button onClick={deleteTaskById(taskId)} className='btn btn-line btn-red'>
                Delete
              </Button>
            </TableLine>
          ))}
        </div>
      </div>
      <Footer />
      {tasksFormActive && (
        <TaskForm
          handleClickClearTasksData={handleClickClearTasksData}
          handleClickShowTaskForm={handleClickShowTaskForm}
        />
      )}
    </div>
  );
};
