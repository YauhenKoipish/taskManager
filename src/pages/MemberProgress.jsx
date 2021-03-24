import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import EmptyData from '../components/EmptyData/EmptyData';
import { Loader } from '../components/Loader/Loader';
import { SideBar } from '../components/SideBar/SideBar';
import { memberProgressFields } from '../services/fields-template';
import { getProgressData, clearData } from '../store/actions/memberProgress';

export const MemberProgress = () => {
  const {
    memberProgress: {
      tasksData,
      isDataLoad,
      selectedUser: { name },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    dispatch(getProgressData(userId));

    return () => {
      dispatch(clearData());
    };
  }, [userId, dispatch]);

  const getPageData = () => {
    if (isDataLoad) {
      if (tasksData.length) {
        return tasksData.map(({ taskId, subTaskId, name: taskName, startDate, date, description, note }, index) => (
          <TableLine
            key={subTaskId || taskId}
            number={index + 1}
            name={taskName}
            note={<div className='note__text'>{description || note}</div>}
            date={startDate || date}
          />
        ));
      }

      return <EmptyData />;
    }

    return <Loader />;
  };

  return (
    <div className='memberProgress wrapper'>
      <SideBar />

      <div className='memberProgress__container'>
        <Header />
        <div className='memberProgress__container__title'>
          <span className='memberProgress__container__title__text'>{`${name} Progress:`}</span>
        </div>
        <div className='memberProgress__container__nav'>
          <TableNav tableNavigationFields={memberProgressFields} />
        </div>
        <div className='memberProgress__container__table'>{getPageData()}</div>
      </div>
      <Footer />
    </div>
  );
};
