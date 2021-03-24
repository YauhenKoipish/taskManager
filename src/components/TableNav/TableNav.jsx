import PropTypes from 'prop-types';

export const TableNav = ({ tableNavigationFields }) => (
  <div className='tableNav__nav'>
    <div className='tableNav__nav__number tableNav__nav-elem'>#</div>
    {tableNavigationFields.map(([key, value]) => (
      <div key={key} className={`tableNav__nav__${key} tableNav__nav-elem`}>
        {value}
      </div>
    ))}
  </div>
);

TableNav.propTypes = {
  tableNavigationFields: PropTypes.arrayOf(PropTypes.array).isRequired,
};
