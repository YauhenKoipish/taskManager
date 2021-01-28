/* eslint-disable no-nested-ternary */
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
import { getTaskTrackById, getSubTaskById, deleteSubTaskById } from '../services/services';
import { taskTracksFields } from '../services/fields-template';

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
    this.handleClickSetTasksTrackData = this.handleClickSetTasksTrackData.bind(this);
    this.handleClickDetailTaskTrack = this.handleClickDetailTaskTrack.bind(this);
    this.handleClickClearTasksTrackData = this.handleClickClearTasksTrackData.bind(this);
  }

  async componentDidMount() {
    const {
      computedMatch: {
        params: { userId, taskId },
      },
    } = this.props;

    const tasksData = await getTaskTrackById(userId, taskId);
    if (tasksData) {
      this.setState({ tasksData, isDataEmpty: tasksData[0], isDataLoad: true });
    }
  }

  handleClickShowTaskTrackForm() {
    const { tasksTrackFormActive } = this.state;
    this.setState({ tasksTrackFormActive: !tasksTrackFormActive });
  }

  async handleClickSetTasksTrackData(subTaskId) {
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
  }

  handleClickClearTasksTrackData() {
    this.setState({ isReadOnly: false });
  }

  async handleClickDetailTaskTrack(id) {
    this.setState({
      isReadOnly: true,
    });
    this.handleClickSetTasksTrackData(id);
  }

  render() {
    const { tasksTrackFormActive, taskData, isReadOnly, isEditMode, tasksData, isDataEmpty, isDataLoad } = this.state;
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
          <div className='taskTracks__container__table'>
            {isDataLoad ? (
              isDataEmpty ? (
                tasksData.map((item, index) => (
                  <TableLine
                    key={item.subTaskId}
                    number={index + 1}
                    name={item.name}
                    note={<div className='note__text'>{item.note}</div>}
                    date={item.date}
                    btnHandleClick={() => {
                      this.handleClickDetailTaskTrack(item.subTaskId);
                    }}
                  >
                    <Button
                      onClick={() => {
                        this.handleClickSetTasksTrackData(item.subTaskId);
                      }}
                      className='btn btn-line '
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        deleteSubTaskById(item.userId, item.taskId, item.subTaskId);
                      }}
                      className='btn btn-line btn-red'
                    >
                      Delete
                    </Button>
                  </TableLine>
                ))
              ) : (
                <EmptyData text='This task has no subTasks!' />
              )
            ) : (
              <Loader />
            )}
          </div>
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
