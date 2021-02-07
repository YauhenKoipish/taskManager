import PropTypes from 'prop-types';
import { Component } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import EmptyData from '../components/EmptyData/EmptyData';
import { SideBar } from '../components/SideBar/SideBar';
import { memberTasksFields } from '../services/fields-template';
import { TaskTrackForm } from '../components/Forms/TaskTrackForm/TaskTrackForm';
import { getTasksDataById, getUserById, changeTaskStatus } from '../services/services';
import { Loader } from '../components/Loader/Loader';

export class MemberTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksTrackFormActive: false,
      taskId: '',
      taskName: '',
      tasksData: [],
      isDataLoad: false,
      isDataEmpty: false,
      selectedUser: {},
    };
    this.getPageData = this.getPageData.bind(this);
    this.handleCLickChangeStatus = this.handleCLickChangeStatus.bind(this);
  }

  async componentDidMount() {
    const {
      computedMatch: {
        params: { userId },
      },
    } = this.props;

    const tasksData = await getTasksDataById(userId);
    const selectedUser = await getUserById(userId);
    if (tasksData) {
      this.setState((prevState) => {
        const isDataEmpty = tasksData[0];
        const isDataLoad = true;

        return { ...prevState, tasksData, isDataEmpty, isDataLoad };
      });
    }
    if (selectedUser) {
      this.setState({ selectedUser });
    }
  }

  handleCLickChangeStatus = (userId, taskId, status) => async () => {
    await changeTaskStatus(userId, taskId, status)();
    const tasksData = await getTasksDataById(userId);
    this.setState({ tasksData });
  };

  handleClickShowTaskTrackForm = (taskId, taskName) => () => {
    const { tasksTrackFormActive } = this.state;
    this.setState({ tasksTrackFormActive: !tasksTrackFormActive, taskId, taskName });
  };

  getPageData() {
    const { tasksData, isDataEmpty, isDataLoad } = this.state;
    const {
      userData,
      computedMatch: {
        params: { userId },
      },
    } = this.props;

    if (isDataLoad) {
      if (isDataEmpty) {
        return tasksData.map(({ name, membersStatus, taskId, taskName, startDate, deadlineDate }, index) => (
          <TableLine
            key={taskId}
            number={index + 1}
            name={name}
            start={startDate}
            deadLine={deadlineDate}
            status={membersStatus[userId]}
            isButtonLink={userData.role === 'MEMBER'}
            path={`/${taskId}/track`}
            btnTask={
              <>
                {userData.role === 'MEMBER' ? (
                  <Button onClick={this.handleClickShowTaskTrackForm(taskId, taskName)} className='btn btn-line '>
                    Track
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={this.handleCLickChangeStatus(userId, taskId, 'Success')}
                      className='btn btn-line btn-green'
                    >
                      Success
                    </Button>
                    <Button
                      onClick={this.handleCLickChangeStatus(userId, taskId, 'Fail')}
                      className='btn btn-line btn-red'
                    >
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
  }

  render() {
    const { selectedUser, tasksTrackFormActive, taskId, taskName } = this.state;
    const {
      userData,
      computedMatch: {
        params: { userId },
      },
    } = this.props;

    return (
      <div className='membersTasks wrapper'>
        <SideBar />
        <div className='membersTasks__container'>
          <Header userData={userData} />
          <div className='membersTasks__container__title'>
            <span className='memberProgress__container__title'>{`It's ${selectedUser.name} tasks:`}</span>
          </div>
          <div className='membersTasks__container__nav'>
            <TableNav tableNavigationFields={memberTasksFields} />
          </div>
          <div className='membersTasks__container__table'>{this.getPageData()}</div>
        </div>
        <Footer />
        {tasksTrackFormActive && (
          <TaskTrackForm
            userId={userId}
            taskName={taskName}
            taskId={taskId}
            handleClickShowTaskTrackForm={this.handleClickShowTaskTrackForm()}
          />
        )}
      </div>
    );
  }
}

MemberTasks.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  computedMatch: PropTypes.objectOf(PropTypes.any).isRequired,
};
