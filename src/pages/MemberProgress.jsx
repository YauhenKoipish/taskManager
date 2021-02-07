/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TableLine } from '../components/TableLine/TableLine';
import { TableNav } from '../components/TableNav/TableNav';
import EmptyData from '../components/EmptyData/EmptyData';
import { Loader } from '../components/Loader/Loader';
import { SideBar } from '../components/SideBar/SideBar';
import { memberProgressFields } from '../services/fields-template';
import { getMemberProgressById, getUserById } from '../services/services';

export class MemberProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksData: [],
      isDataEmpty: false,
      isDataLoad: false,
      selectedUser: {},
    };
    this.getPageData = this.getPageData.bind(this);
  }

  async componentDidMount() {
    const {
      computedMatch: {
        params: { userId },
      },
    } = this.props;

    const tasksData = await getMemberProgressById(userId);
    const selectedUser = await getUserById(userId);
    if (tasksData) {
      this.setState((prevState) => {
        const isDataEmpty = tasksData[0];
        const isDataLoad = true;

        return { ...prevState, tasksData, isDataEmpty, isDataLoad };
      });
    }
    if (selectedUser) {
      this.setState({ selectedUser });
    }
  }

  getPageData() {
    const { tasksData, isDataEmpty, isDataLoad } = this.state;
    if (isDataLoad) {
      if (isDataEmpty) {
        return tasksData.map(({ taskId, subTaskId, name, startDate, date, description, note }, index) => (
          <TableLine
            key={subTaskId || taskId}
            number={index + 1}
            name={name}
            note={<div className='note__text'>{description || note}</div>}
            date={startDate || date}
          />
        ));
      }
      return <EmptyData />;
    }
    return <Loader />;
  }

  render() {
    const { selectedUser } = this.state;
    const { userData } = this.props;

    return (
      <div className='memberProgress wrapper'>
        <SideBar />

        <div className='memberProgress__container'>
          <Header userData={userData} />
          <div className='memberProgress__container__title'>
            <span className='memberProgress__container__title__text'>{`${selectedUser.name} Progress:`}</span>
          </div>
          <div className='memberProgress__container__nav'>
            <TableNav tableNavigationFields={memberProgressFields} />
          </div>
          <div className='memberProgress__container__table'>{this.getPageData()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

MemberProgress.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  computedMatch: PropTypes.objectOf(PropTypes.any).isRequired,
};
