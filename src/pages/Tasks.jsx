import PropTypes from 'prop-types';
import { Component } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { tasksFields } from '../services/fields-template';
import { TaskForm } from '../components/Forms/TaskForm/TaskForm';
import { getTaskById, deleteTaskById } from '../services/services';

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksFormActive: false,
      taskData: null,
      isReadOnly: false,
      isEditMode: false,
    };
    this.handleClickShowTaskForm = this.handleClickShowTaskForm.bind(this);
    this.handleClickSetTasksData = this.handleClickSetTasksData.bind(this);
    this.handleClickClearTasksData = this.handleClickClearTasksData.bind(this);
    this.handleClickDetailTasks = this.handleClickDetailTasks.bind(this);
  }

  handleClickShowTaskForm() {
    const { tasksFormActive } = this.state;
    this.setState({ tasksFormActive: !tasksFormActive });
  }

  async handleClickSetTasksData(id) {
    const taskData = await getTaskById(id);
    this.setState({
      taskData,
      isEditMode: true,
    });
    this.handleClickShowTaskForm();
  }

  async handleClickDetailTasks(id) {
    this.setState({
      isReadOnly: true,
    });
    this.handleClickSetTasksData(id);
  }

  handleClickClearTasksData() {
    this.setState({ taskData: null, isReadOnly: false, isEditMode: false });
  }

  render() {
    const { tasksFormActive, taskData, isReadOnly, isEditMode } = this.state;
    const { userData, tasksData, membersData } = this.props;
    return (
      <div className='tasks wrapper'>
        <SideBar />
        <div className='tasks__container'>
          <Header userData={userData} />
          <div className='tasks__container__btn'>
            <Button onClick={this.handleClickShowTaskForm} className='btn'>
              Create
            </Button>
          </div>
          <div className='tasks__container__nav'>
            <TableNav tableNavigationFields={tasksFields} />
          </div>
          <div className='tasks__container__table'>
            {tasksData.map((item, index) => (
              <TableLine
                key={item.name + item.startDate}
                number={index + 1}
                name={item.name}
                start={item.startDate}
                deadLine={item.deadlineDate}
                btnHandleClick={() => {
                  this.handleClickDetailTasks(item.taskId);
                }}
              >
                <Button onClick={() => this.handleClickSetTasksData(item.taskId)} className='btn btn-line '>
                  Edit
                </Button>
                <Button onClick={() => deleteTaskById(item.taskId)} className='btn btn-line btn-red'>
                  Delete
                </Button>
              </TableLine>
            ))}
          </div>
        </div>
        <Footer />
        {tasksFormActive && (
          <TaskForm
            isEditMode={isEditMode}
            taskData={taskData}
            membersData={membersData}
            isReadOnly={isReadOnly}
            handleClickClearTasksData={this.handleClickClearTasksData}
            handleClickShowTaskForm={this.handleClickShowTaskForm}
          />
        )}
      </div>
    );
  }
}

Tasks.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  tasksData: PropTypes.arrayOf(PropTypes.any).isRequired,
  membersData: PropTypes.arrayOf(PropTypes.any).isRequired,
};
