import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { MEMBER, sideBarList } from '../../services/fields-template';
import { Button } from '../Buttons/Button/Button';
import backImg from './style/back.png';

export const SideBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  function handleClickBack() {
    history.goBack();
  }

  const {
    app: {
      userData: { role },
    },
  } = useSelector((state) => state);

  return (
    <div className='sideBar'>
      <div className='sideBar__container'>
        {role !== MEMBER &&
          sideBarList.map(({ path, name, img }) => (
            <Link to={path} key={name} className={`sideBar__container__elem ${pathname === path && 'active'}`}>
              <img alt='img' className='sideBar__container__elem__img' src={img} />
              <span className='sideBar__container__elem__desc'>{name}</span>
            </Link>
          ))}
        <Button onClick={handleClickBack} className='sideBar__container__elem'>
          <img alt='img' className='sideBar__container__elem__img' src={backImg} />
          <span className='sideBar__container__elem__desc'>Back</span>
        </Button>
      </div>
    </div>
  );
};
