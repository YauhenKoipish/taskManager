/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import EmptyData from '../components/EmptyData/EmptyData';
import { SideBar } from '../components/SideBar/SideBar';
import { MEMBER, memberTasksFields } from '../services/fields-template';
import TaskTrackForm from '../components/Forms/TaskTrackForm/TaskTrackForm';
import { Loader } from '../components/Loader/Loader';
import { getTasksData, changeStatus, showForm, setTaskData } from '../store/actions/memberTasks';

export const MemberTasks = () => {
  const {
    memberTasks: { tasksData, taskId: choceTaskId, tasksTrackFormActive, isDataLoad, selectedUser },
    app: { userData },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getTasksData(userId));
    }
  }, [dispatch, userId]);

  const handleClickShowTaskTrackForm = (taskId, taskName) => () => {
    dispatch(setTaskData(taskId, taskName));
    dispatch(showForm());
  };

  const handleClickCloseTaskTrackForm = () => {
    dispatch(showForm());
  };

  const getPageData = () => {
    if (isDataLoad) {
      if (tasksData.length) {
        return tasksData.map(({ name, membersStatus, taskId, taskName, startDate, deadlineDate }, index) => (
          <TableLine
            key={taskId}
            number={index + 1}
            name={name}
            start={startDate}
            deadLine={deadlineDate}
            status={membersStatus[userId]}
            isButtonLink={userData.role === MEMBER}
            path={`/${taskId}/track`}
            btnTask={
              <>
                {userData.role === MEMBER ? (
                  <Button onClick={handleClickShowTaskTrackForm(taskId, taskName)} className='btn btn-line '>
                    Track
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={dispatch(changeStatus(userId, taskId, 'Success'))}
                      className='btn btn-line btn-green'
                    >
                      Success
                    </Button>
                    <Button onClick={dispatch(changeStatus(userId, taskId, 'Fail'))} className='btn btn-line btn-red'>
                      Fail
                    </Button>
                  </>
                )}
              </>
            }
          />
        ));
      }

      return <EmptyData />;
    }

    return <Loader />;
  };

  return (
    <div className='membersTasks wrapper'>
      <SideBar />
      <div className='membersTasks__container'>
        <Header />
        <div className='membersTasks__container__title'>
          <span className='memberProgress__container__title'>{`It's ${selectedUser.name} tasks:`}</span>
        </div>
        <div className='membersTasks__container__nav'>
          <TableNav tableNavigationFields={memberTasksFields} />
        </div>
        <div className='membersTasks__container__table'>{getPageData()}</div>
      </div>
      <Footer />
      {tasksTrackFormActive && (
        <TaskTrackForm userId={userId} taskId={choceTaskId} closeForm={handleClickCloseTaskTrackForm} />
      )}
    </div>
  );
};
