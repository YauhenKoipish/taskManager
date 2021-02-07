/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.module.scss';
import { Members } from '../pages/Members';
import { MemberProgress } from '../pages/MemberProgress';
import { MemberTasks } from '../pages/MemberTasks';
import { Tasks } from '../pages/Tasks';
import { TaskTracks } from '../pages/TaskTracks';
import { Loader } from '../components/Loader/Loader';
import { Login } from '../pages/Login';
import PasswordChange from '../pages/PasswordChange';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { getUserData } from '../store/actions/app';

class App extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    const { isAuth, isDataLoad, userData, isVerified } = this.props;
    console.log(this.props);

    let routes = (
      <Switch>
        <PrivateRoute
          condition={isAuth}
          userData={userData}
          // membersData={membersData}
          component={Members}
          user
          path='/members'
          redirectPath='/'
          exact
        />
        <PrivateRoute
          condition={isAuth}
          userData={userData}
          component={MemberProgress}
          path='/member/:userId/progress'
          redirectPath='/'
          exact
        />
        <PrivateRoute
          condition={isAuth}
          userData={userData}
          component={MemberTasks}
          path='/member/:userId/tasks'
          redirectPath='/'
          exact
        />
        <PrivateRoute
          condition={isAuth}
          userData={userData}
          // tasksData={tasksData}
          // membersData={membersData}
          component={Tasks}
          path='/tasks'
          redirectPath='/'
          exact
        />
        <PrivateRoute
          condition={isAuth && !isVerified}
          userData={userData}
          // tasksData={tasksData}
          component={PasswordChange}
          path='/password-change'
          redirectPath='/members'
          exact
        />
        {isAuth ? <Redirect to='/password-change' /> : <Route path='/' render={(props) => <Login />} />}
      </Switch>
    );

    if (userData.role === 'MEMBER') {
      routes = (
        <Switch>
          <PrivateRoute
            condition={isAuth}
            userData={userData}
            component={MemberTasks}
            path='/member/:userId/tasks'
            redirectPath='/'
            exact
          />
          <PrivateRoute
            condition={isAuth}
            userData={userData}
            // tasksData={tasksData}
            component={TaskTracks}
            path='/member/:userId/tasks/:taskId/track'
            redirectPath='/'
            exact
          />
          <PrivateRoute
            condition={isAuth && !isVerified}
            userData={userData}
            // tasksData={tasksData}
            component={PasswordChange}
            path='/password-change'
            redirectPath={`/member/${userData.userId}/tasks`}
            exact
          />
          {isAuth ? <Redirect to='/password-change' /> : <Route path='/' render={(props) => <Login />} />}
        </Switch>
      );
    }

    return <>{isDataLoad ? <Router>{routes}</Router> : <Loader />}</>;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.app.isAuth,
    isDataLoad: state.app.isDataLoad,
    userData: state.app.userData,
    membersData: state.app.membersData,
    tasksData: state.app.tasksData,
    isVerified: state.app.isVerified,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserData: () => dispatch(getUserData()),
  };
}

App.propTypes = {
  getUserData: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isDataLoad: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
