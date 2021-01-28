import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { ButtonLink } from '../Buttons/ButtonLink/ButtonLink';
import noop from '../../shared/noop';

export const TableLine = ({ number, name, children, btnHandleClick, path, isButtonLink, ...restProps }) => {
  const propsOtherFields = Object.entries(restProps);

  const location = useLocation();

  return (
    <div className='tableLine'>
      <div className='tableLine__number tableLine-elem'>{number}</div>
      {isButtonLink ? (
        <ButtonLink to={`${location.pathname}${path}`} className='tableLine__name tableLine-elem'>
          {name}
        </ButtonLink>
      ) : (
        <Button onClick={btnHandleClick} className='tableLine__name tableLine-elem'>
          {name}
        </Button>
      )}

      {propsOtherFields.map(([key, value]) => (
        <div key={key} className={`tableLine-elem tableLine__${key} ${value === 'Sucess' && 'tableLine__sucess'}`}>
          {value}
        </div>
      ))}
      {children && <div className='tableLine__buttons tableLine-elem'>{children}</div>}
    </div>
  );
};

TableLine.propTypes = {
  number: PropTypes.number.isRequired,
  isButtonLink: PropTypes.bool,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  btnHandleClick: PropTypes.func,
  path: PropTypes.string,
};
TableLine.defaultProps = {
  children: null,
  isButtonLink: false,
  path: '/',
  btnHandleClick: noop,
};
