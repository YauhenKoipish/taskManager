/* eslint-disable no-nested-ternary */
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
import { getTasksDataById, getUserById } from '../services/services';
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
    this.handleClickShowTaskTrackForm = this.handleClickShowTaskTrackForm.bind(this);
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
      this.setState({ tasksData, isDataEmpty: tasksData[0], isDataLoad: true });
    }
    if (selectedUser) {
      this.setState({ selectedUser });
    }
  }

  handleClickShowTaskTrackForm(taskId, taskName) {
    const { tasksTrackFormActive } = this.state;
    this.setState({ tasksTrackFormActive: !tasksTrackFormActive, taskId, taskName });
  }

  render() {
    const { selectedUser, tasksTrackFormActive, taskId, taskName, tasksData, isDataEmpty, isDataLoad } = this.state;
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
          <div className='membersTasks__container__table'>
            {isDataLoad ? (
              isDataEmpty ? (
                tasksData.map((item, index) => (
                  <TableLine
                    key={item.name + item.status}
                    number={index + 1}
                    name={item.name}
                    start={item.startDate}
                    deadLine={item.deadlineDate}
                    status={item.status}
                    isButtonLink
                    path={`/${item.taskId}/track`}
                    btnTask={
                      <Button
                        onClick={() => this.handleClickShowTaskTrackForm(item.taskId, item.name)}
                        className='btn btn-line'
                      >
                        Track
                      </Button>
                    }
                  >
                    <Button className='btn btn-line btn-green'>Success</Button>
                    <Button className='btn btn-line btn-red'>Fail</Button>
                  </TableLine>
                ))
              ) : (
                <EmptyData />
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
            taskName={taskName}
            taskId={taskId}
            handleClickShowTaskTrackForm={this.handleClickShowTaskTrackForm}
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
