import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export default function SelectControl({ readOnly, onChangeFunc, defaultValue, array }) {
  return (
    <Form.Control readOnly={readOnly} onBlur={onChangeFunc} required as='select' defaultValue={defaultValue}>
      {array.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </Form.Control>
  );
}

SelectControl.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  array: PropTypes.arrayOf(PropTypes.string).isRequired,
};
