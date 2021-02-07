import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Component } from 'react';
import { Button } from '../../Buttons/Button/Button';
import noop from '../../../shared/noop';
import { setUserSubTaskData, getRandomId, getTaskById } from '../../../services/services';

export class TaskTrackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      name: '',
      date: '',
      subTaskId: '',
      taskId: '',
      userId: '',
      validated: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleClickBackToGrid = this.handleClickBackToGrid.bind(this);
  }

  async componentDidMount() {
    const { taskData, taskId } = this.props;
    if (taskData) {
      const { note, date, name } = taskData;
      this.setState({
        note,
        date,
        name,
      });
    } else {
      getTaskById(taskId).then(({ name }) => {
        this.setState({ name });
      });
    }
  }

  handleClickBackToGrid() {
    const { handleClickShowTaskTrackForm, handleClickClearTasksTrackData } = this.props;
    handleClickClearTasksTrackData();
    handleClickShowTaskTrackForm();
  }

  async submitForm(event) {
    const { isEditMode, taskData, handleClickShowTaskTrackForm, userId, taskId } = this.props;

    const form = event.currentTarget;
    event.preventDefault();
    this.setState({ validated: true });
    if (form.checkValidity() === true) {
      const subTaskId = isEditMode ? taskData.subTaskId : getRandomId();
      this.setState({ subTaskId, taskId, userId }, () => {
        setUserSubTaskData(this.state);
        handleClickShowTaskTrackForm();
      });
    }
  }

  inputChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  render() {
    const { date, note, validated } = this.state;
    const { isReadOnly, isEditMode, taskData } = this.props;

    const formTitle = isEditMode || isReadOnly ? `Task -  ${taskData.name}` : 'Create subTask';
    return (
      <div className='memberForm form'>
        <div className='memberForm__container form__container'>
          <div className='memberForm__container__title form__container__title'>{formTitle}</div>

          <Form noValidate validated={validated} onSubmit={this.submitForm}>
            <Form.Group as={Row} controlId='date'>
              <Form.Label>DeadLine</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  type='date'
                  defaultValue={date}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='note'>
              <Form.Label>Note</Form.Label>
              <Col>
                <Form.Control
                  readOnly={isReadOnly}
                  onChange={this.inputChange}
                  as='textarea'
                  defaultValue={note}
                  required
                />
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

TaskTrackForm.propTypes = {
  handleClickShowTaskTrackForm: PropTypes.func.isRequired,
  handleClickClearTasksTrackData: PropTypes.func,
  taskData: PropTypes.objectOf(PropTypes.any),
  isReadOnly: PropTypes.bool,
  isEditMode: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TaskTrackForm.defaultProps = {
  taskData: null,
  handleClickClearTasksTrackData: noop,
  isReadOnly: false,
  isEditMode: false,
};
