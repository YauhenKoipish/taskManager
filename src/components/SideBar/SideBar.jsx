/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import membersImg from './style/members.png';
import tasksImg from './style/tasks.png';
import backImg from './style/back.png';

const sideBarList = [
  { name: 'Members', path: '/members', img: membersImg },
  { name: 'Tasks', path: '/tasks', img: tasksImg },
];

export const SideBar = () => {
  const history = useHistory();

  function handleClickBack() {
    history.goBack();
  }

  return (
    <div className='sideBar'>
      <div className='sideBar__container'>
        {sideBarList.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`sideBar__container__elem ${document.location.pathname === item.path && 'active'}`}
          >
            <img alt='img' className='sideBar__container__elem__img' src={item.img} />
            <span className='sideBar__container__elem__desc'> {item.name}</span>
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
