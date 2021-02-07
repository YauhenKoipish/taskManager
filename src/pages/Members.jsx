import PropTypes from 'prop-types';
import { Component } from 'react';
import { ButtonLink } from '../components/Buttons/ButtonLink/ButtonLink';
import { Button } from '../components/Buttons/Button/Button';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import { Footer } from '../components/Footer/Footer';
import { MemberForm } from '../components/Forms/MemberForm/MemberForm';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { getUserById, deleteUserById } from '../services/services';
import { membersFields } from '../services/fields-template';

export class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberFormActive: false,
      memberData: null,
      isReadOnly: false,
      isEditMode: false,
    };
    this.handleClickShowMemberForm = this.handleClickShowMemberForm.bind(this);
    this.handleClickClearMemberData = this.handleClickClearMemberData.bind(this);
  }

  handleClickShowMemberForm() {
    const { memberFormActive } = this.state;
    this.setState({ memberFormActive: !memberFormActive });
  }

  handleClickSetMemberData = (id) => async () => {
    const memberData = await getUserById(id);

    this.setState({
      memberData,
      isEditMode: true,
    });
    this.handleClickShowMemberForm();
  };

  handleClickDetailMember = (id) => () => {
    this.setState({
      isReadOnly: true,
    });
    this.handleClickSetMemberData(id)();
  };

  handleClickClearMemberData() {
    this.setState({ memberData: null, isReadOnly: false, isEditMode: false });
  }

  render() {
    const { memberFormActive, memberData, isReadOnly, isEditMode } = this.state;
    const { userData, membersData } = this.props;

    const isAdmin = userData.role === 'ADMIN';
    return (
      <div className='members wrapper'>
        <SideBar />

        <div className='members__container '>
          <Header userData={userData} />
          <div className='members__container__btn'>
            {isAdmin && (
              <Button onClick={this.handleClickShowMemberForm} className='btn'>
                Register
              </Button>
            )}
          </div>
          <div className='members__container__nav'>
            <TableNav tableNavigationFields={membersFields} />
          </div>
          <div className='members__container__table'>
            {/* {membersData.map(({ name, age, direction, education, startDate, userId }, index) => (
              <TableLine
                key={userId}
                number={index + 1}
                name={name}
                direction={direction}
                education={education}
                start={startDate}
                age={age}
                handleClick={this.handleClickDetailMember(userId)}
              >
                <ButtonLink path={`/member/${userId}/progress`} className='btn btn-line'>
                  Progress
                </ButtonLink>
                <ButtonLink path={`/member/${userId}/tasks`} className='btn btn-line'>
                  Tasks
                </ButtonLink>
                {isAdmin && (
                  <>
                    <Button onClick={this.handleClickSetMemberData(userId)} className='btn btn-line'>
                      Edit
                    </Button>
                    <Button onClick={deleteUserById(userId)} className='btn btn-line btn-red'>
                      Delete
                    </Button>
                  </>
                )}
              </TableLine>
            ))} */}
          </div>
        </div>
        <Footer />
        {memberFormActive && (
          <MemberForm
            isEditMode={isEditMode}
            memberData={memberData}
            isReadOnly={isReadOnly}
            handleClickClearMemberData={this.handleClickClearMemberData}
            handleClickShowMemberForm={this.handleClickShowMemberForm}
          />
        )}
      </div>
    );
  }
}

Members.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  membersData: PropTypes.arrayOf(PropTypes.any).isRequired,
};
