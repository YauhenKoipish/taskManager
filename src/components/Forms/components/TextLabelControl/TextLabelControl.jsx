import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export default function TextLabelControl({ readOnly, onChangeFunc, defaultValue }) {
  return <Form.Control readOnly={readOnly} onChange={onChangeFunc} required type='text' defaultValue={defaultValue} />;
}

TextLabelControl.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
};
