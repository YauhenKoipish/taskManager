import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import EmptyData from '../components/EmptyData/EmptyData';
import { Loader } from '../components/Loader/Loader';
import TaskTrackForm from '../components/Forms/TaskTrackForm/TaskTrackForm';
import { deleteSubTaskById } from '../services/services';
import { taskTracksFields } from '../services/fields-template';
import { getSubtasksData, getSubtaskData, showForm, setDetailMode, unsubscribeData } from '../store/actions/taskTrack';

export const TaskTracks = () => {
  const {
    taskTrack: { tasksTrackFormActive, isDataLoad, tasksData },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { userId, taskId } = useParams();

  useEffect(() => {
    dispatch(getSubtasksData(userId, taskId));

    return () => {
      dispatch(unsubscribeData());
    };
  }, [dispatch, userId, taskId]);

  const handleClickSetTasksTrackData = (subTaskId) => () => {
    dispatch(getSubtaskData(userId, taskId, subTaskId));
  };

  const handleClickDetailTaskTrack = (subTaskId) => () => {
    dispatch(setDetailMode());
    dispatch(getSubtaskData(userId, taskId, subTaskId));
  };

  const handleClickCloseTaskTrackForm = () => {
    dispatch(showForm());
  };

  const getPageData = () => {
    if (isDataLoad) {
      if (tasksData.length) {
        return tasksData.map(({ subTaskId, taskId: choiseTaskId, userId: choiseUserId, name, date, note }, index) => (
          <TableLine
            key={subTaskId}
            number={index + 1}
            name={name}
            note={<div className='note__text'>{note}</div>}
            date={date}
            handleClick={handleClickDetailTaskTrack(subTaskId)}
          >
            <Button onClick={handleClickSetTasksTrackData(subTaskId)} className='btn btn-line '>
              Edit
            </Button>
            <Button onClick={deleteSubTaskById(choiseUserId, choiseTaskId, subTaskId)} className='btn btn-line btn-red'>
              Delete
            </Button>
          </TableLine>
        ));
      }

      return <EmptyData text='This task has no subTasks!' />;
    }

    return <Loader />;
  };

  return (
    <div className='taskTracks wrapper'>
      <SideBar />
      <div className='taskTracks__container'>
        <Header />
        <div className='taskTracks__container__title'>
          <span className='memberProgress__container__title'>This is you task tracks:</span>
        </div>
        <div className='taskTracks__container__nav'>
          <TableNav tableNavigationFields={taskTracksFields} />
        </div>
        <div className='taskTracks__container__table'>{getPageData()}</div>
      </div>
      <Footer />
      {tasksTrackFormActive && (
        <TaskTrackForm userId={userId} taskId={taskId} closeForm={handleClickCloseTaskTrackForm} />
      )}
    </div>
  );
};
