import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { PureComponent } from 'react';
import { Button } from '../../Buttons/Button/Button';
import { setTaskData, getRandomId } from '../../../services/services';
import { createFullName } from '../../../services/createFullName';

class TaskForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      startDate: '',
      deadlineDate: '',
      taskId: '',
      members: {},
      name: '',
      status: 'Active',
      validated: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.setTaskToMember = this.setTaskToMember.bind(this);
    this.handleClickBackToGrid = this.handleClickBackToGrid.bind(this);
  }

  componentDidMount() {
    const { membersData, taskData } = this.props;
    if (taskData) {
      const { description, startDate, deadlineDate, name, members } = taskData;
      this.setState({
        description,
        startDate,
        deadlineDate,
        name,
        members,
      });
    } else {
      const { members } = this.state;
      const membersStatus = {};
      membersData.forEach((item) => {
        members[item.userId] = false;
        membersStatus[item.userId] = 'Active';
      });
      this.setState({ members, membersStatus });
    }
  }

  handleClickBackToGrid() {
    const { handleClickClearTasksData, handleClickShowTaskForm } = this.props;
    handleClickClearTasksData();
    handleClickShowTaskForm();
  }

  setTaskToMember(event) {
    const { members: prevMembers } = this.state;
    const { id } = event.target;
    const members = { ...prevMembers };
    members[id] = !members[id];
    this.setState({ members });
  }

  async submitForm(event) {
    const { isEditMode, taskData } = this.props;
    const { currentTarget } = event;

    event.preventDefault();
    this.setState({ validated: true });
    if (currentTarget.checkValidity() === true) {
      const taskId = isEditMode ? taskData.taskId : getRandomId();
      this.setState({ taskId }, () => {
        setTaskData(this.state);
        this.handleClickBackToGrid();
      });
    }
  }

  inputChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  render() {
    const { description, startDate, deadlineDate, members, validated, name } = this.state;
    const { isReadOnly, isEditMode, membersData, taskData } = this.props;

    const formTitle = isEditMode || isReadOnly ? `Task -  ${taskData.name}` : 'Create task';

    return (
      <div className='memberForm form'>
        <div className='memberForm__container form__container'>
          <div className='memberForm__container__title form__container__title'>{formTitle}</div>

          <Form noValidate validated={validated} onSubmit={this.submitForm}>
            <Form.Group as={Row} controlId='name'>
              <Form.Label>Name</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  type='text'
                  defaultValue={name}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='description'>
              <Form.Label>Description</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  as='textarea'
                  defaultValue={description}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='startDate'>
              <Form.Label>Start</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  type='date'
                  defaultValue={startDate}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='deadlineDate'>
              <Form.Label>DeadLine</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  type='date'
                  defaultValue={deadlineDate}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='members'>
              <Form.Label>Members</Form.Label>
              <Col>
                <div className='memberForm__container__members'>
                  {membersData.map(({ userId, name: memberName, lastName }) => (
                    <Form.Check
                      disabled={isReadOnly}
                      key={userId}
                      type='checkbox'
                      id={userId}
                      defaultChecked={members[userId]}
                      onClick={this.setTaskToMember}
                      label={createFullName(memberName, lastName)}
                    />
                  ))}
                </div>
              </Col>
            </Form.Group>

            <div className='memberForm__container__row'>
              {!isReadOnly && (
                <Button type='submit' className='btn btn-green '>
                  Save
                </Button>
              )}
              <Button onClick={this.handleClickBackToGrid} className='btn btn-white '>
                Back to grid
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

TaskForm.propTypes = {
  handleClickShowTaskForm: PropTypes.func.isRequired,
  handleClickClearTasksData: PropTypes.func.isRequired,
  taskData: PropTypes.shape({
    description: PropTypes.string,
    startDate: PropTypes.string,
    deadlineDate: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.objectOf(PropTypes.bool),
    taskId: PropTypes.string,
  }),
  membersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

TaskForm.defaultProps = {
  taskData: null,
};

function mapStateToProps({ tasks: { taskData, isEditMode, isReadOnly }, app: { membersData } }) {
  return {
    taskData,
    isEditMode,
    isReadOnly,
    membersData,
  };
}

export default connect(mapStateToProps)(TaskForm);
