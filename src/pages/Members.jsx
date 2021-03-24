import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { ButtonLink } from '../components/Buttons/ButtonLink/ButtonLink';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Footer } from '../components/Footer/Footer';
import { MemberForm } from '../components/Forms/MemberForm/MemberForm';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { deleteUserById } from '../services/services';
import { ADMIN, membersFields } from '../services/fields-template';
import { getMemberData, clearData, setReadOnly } from '../store/actions/members';

export const Members = () => {
  const [memberFormActive, setMemberFormActive] = useState(false);
  const {
    app: { membersData, userData },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClickShowMemberForm = () => {
    setMemberFormActive((prevValue) => !prevValue);
  };

  const handleClickSetMemberData = (id) => () => {
    dispatch(getMemberData(id));
    setMemberFormActive((prevValue) => !prevValue);
  };

  const setMemberData = async (id) => {
    await dispatch(getMemberData(id));
    handleClickShowMemberForm();
  };

  const handleClickDetailMember = (id) => () => {
    dispatch(setReadOnly());
    setMemberData(id);
  };

  const handleClickClearMemberData = () => {
    dispatch(clearData());
  };

  const isAdmin = userData.role === ADMIN;

  return (
    <div className='members wrapper'>
      <SideBar />

      <div className='members__container '>
        <Header />
        <div className='members__container__btn'>
          {isAdmin && (
            <Button onClick={handleClickShowMemberForm} className='btn'>
              Register
            </Button>
          )}
        </div>
        <div className='members__container__nav'>
          <TableNav tableNavigationFields={membersFields} />
        </div>
        <div className='members__container__table'>
          {membersData.map(({ name, age, direction, education, startDate, userId }, index) => (
            <TableLine
              key={userId}
              number={index + 1}
              name={name}
              direction={direction}
              education={education}
              start={startDate}
              age={age}
              handleClick={handleClickDetailMember(userId)}
            >
              <ButtonLink path={`/member/${userId}/progress`} className='btn btn-line'>
                Progress
              </ButtonLink>
              <ButtonLink path={`/member/${userId}/tasks`} className='btn btn-line'>
                Tasks
              </ButtonLink>
              {isAdmin && (
                <>
                  <Button onClick={handleClickSetMemberData(userId)} className='btn btn-line'>
                    Edit
                  </Button>
                  <Button onClick={deleteUserById(userId)} className='btn btn-line btn-red'>
                    Delete
                  </Button>
                </>
              )}
            </TableLine>
          ))}
        </div>
      </div>
      <Footer />
      {memberFormActive && (
        <MemberForm
          handleClickClearMemberData={handleClickClearMemberData}
          handleClickShowMemberForm={handleClickShowMemberForm}
        />
      )}
    </div>
  );
};
