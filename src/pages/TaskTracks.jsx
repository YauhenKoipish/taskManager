import PropTypes from 'prop-types';
import { Component } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import EmptyData from '../components/EmptyData/EmptyData';
import { Loader } from '../components/Loader/Loader';
import { TaskTrackForm } from '../components/Forms/TaskTrackForm/TaskTrackForm';
import { getSubTaskById, deleteSubTaskById } from '../services/services';
import { taskTracksFields } from '../services/fields-template';
import { db } from '../services/firebase';

export class TaskTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksTrackFormActive: false,
      taskData: null,
      isReadOnly: false,
      isEditMode: false,
      tasksData: [],
      isDataEmpty: false,
      isDataLoad: false,
    };
    this.handleClickShowTaskTrackForm = this.handleClickShowTaskTrackForm.bind(this);
    this.handleClickClearTasksTrackData = this.handleClickClearTasksTrackData.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.getRealtimeUpdateData = this.getRealtimeUpdateData.bind(this);
  }

  async componentDidMount() {
    const {
      computedMatch: {
        params: { userId, taskId },
      },
    } = this.props;

    await this.getRealtimeUpdateData(userId, taskId);
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state;
    unsubscribe();
  }

  handleClickShowTaskTrackForm() {
    const { tasksTrackFormActive } = this.state;
    this.setState({ tasksTrackFormActive: !tasksTrackFormActive });
  }

  handleClickSetTasksTrackData = (subTaskId) => async () => {
    const {
      computedMatch: {
        params: { userId, taskId },
      },
    } = this.props;

    const taskData = await getSubTaskById(userId, taskId, subTaskId);
    this.setState({
      taskData,
      isEditMode: true,
    });
    this.handleClickShowTaskTrackForm();
  };

  handleClickClearTasksTrackData() {
    this.setState({ isReadOnly: false });
  }

  getRealtimeUpdateData = (userId, taskId) => {
    const unsubscribe = db
      .collection('data')
      .doc('memberTasks')
      .onSnapshot((doc) => {
        const userData = doc.data()[userId];
        if (userData && userData[taskId]) {
          this.setState({
            tasksData: Object.values(userData[taskId]),
            isDataEmpty: Object.values(userData[taskId])[0],
            isDataLoad: true,
          });
        } else {
          this.setState({
            isDataEmpty: null,
            isDataLoad: true,
          });
        }
        return {};
      });
    this.setState({ unsubscribe });
  };

  handleClickDetailTaskTrack = (id) => async () => {
    this.setState({
      isReadOnly: true,
    });
    this.handleClickSetTasksTrackData(id)();
  };

  getPageData() {
    const { tasksData, isDataEmpty, isDataLoad } = this.state;

    if (isDataLoad) {
      if (isDataEmpty) {
        return tasksData.map(({ subTaskId, taskId, userId, name, date, note }, index) => (
          <TableLine
            key={subTaskId}
            number={index + 1}
            name={name}
            note={<div className='note__text'>{note}</div>}
            date={date}
            handleClick={this.handleClickDetailTaskTrack(subTaskId)}
          >
            <Button onClick={this.handleClickSetTasksTrackData(subTaskId)} className='btn btn-line '>
              Edit
            </Button>
            <Button onClick={deleteSubTaskById(userId, taskId, subTaskId)} className='btn btn-line btn-red'>
              Delete
            </Button>
          </TableLine>
        ));
      }
      return <EmptyData text='This task has no subTasks!' />;
    }
    return <Loader />;
  }

  render() {
    const { tasksTrackFormActive, taskData, isReadOnly, isEditMode } = this.state;
    const {
      userData,
      computedMatch: {
        params: { userId, taskId },
      },
    } = this.props;
    return (
      <div className='taskTracks wrapper'>
        <SideBar />
        <div className='taskTracks__container'>
          <Header userData={userData} />
          <div className='taskTracks__container__title'>
            <span className='memberProgress__container__title'>This is you task tracks:</span>
          </div>
          <div className='taskTracks__container__nav'>
            <TableNav tableNavigationFields={taskTracksFields} />
          </div>
          <div className='taskTracks__container__table'>{this.getPageData()}</div>
        </div>
        <Footer />
        {tasksTrackFormActive && (
          <TaskTrackForm
            userId={userId}
            taskId={taskId}
            isEditMode={isEditMode}
            taskData={taskData}
            isReadOnly={isReadOnly}
            handleClickClearTasksTrackData={this.handleClickClearTasksTrackData}
            handleClickShowTaskTrackForm={this.handleClickShowTaskTrackForm}
          />
        )}
      </div>
    );
  }
}

TaskTracks.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  computedMatch: PropTypes.objectOf(PropTypes.any).isRequired,
};
