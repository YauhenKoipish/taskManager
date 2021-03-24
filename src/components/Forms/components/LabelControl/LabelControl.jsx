import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export default function LabelControl({
  feedbackText,
  labelText,
  controlId,
  readOnly,
  onChangeFunc,
  defaultValue,
  type,
  ...restProps
}) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{labelText}</Form.Label>
      <Form.Control
        readOnly={readOnly}
        onChange={onChangeFunc}
        required
        type={type}
        defaultValue={defaultValue}
        {...restProps}
      />
      <div className='invalid-feedback'>{feedbackText}</div>
    </Form.Group>
  );
}

LabelControl.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  feedbackText: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  controlId: PropTypes.string.isRequired,
  type: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
};

LabelControl.defaultProps = {
  type: 'text',
};
