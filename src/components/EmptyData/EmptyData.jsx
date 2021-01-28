import PropTypes from 'prop-types';

export default function EmptyData({ text }) {
  return <div className='table__empty'>{text}</div>;
}

EmptyData.propTypes = {
  text: PropTypes.string,
};
EmptyData.defaultProps = {
  text: 'This user has no tasks!',
};
