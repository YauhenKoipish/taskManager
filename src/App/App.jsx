import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.module.scss';
import { Members } from '../pages/Members';
import { MemberProgress } from '../pages/MemberProgress';
import { MemberTasks } from '../pages/MemberTasks';
import { Tasks } from '../pages/Tasks';
import { TaskTracks } from '../pages/TaskTracks';
import { Loader } from '../components/Loader/Loader';
import firebase, { db } from '../services/firebase';
import { Login } from '../pages/Login';
import PasswordChange from '../pages/PasswordChange';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { getUserById, getUserValidation } from '../services/services';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      isAuth: false,
      isDataLoad: false,
      userData: {},
      membersData: [],
      tasksData: [],
      isVerified: false,
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const promise = Promise.all([
          getUserById(user.uid),
          getUserValidation(user.uid),
          db
            .collection('data')
            .doc('tasks')
            .onSnapshot((doc) => {
              this.setState({ tasksData: Object.values(doc.data()) });
            }),
          db
            .collection('data')
            .doc('users')
            .onSnapshot((doc) => {
              this.setState({ membersData: Object.values(doc.data()) });
            }),
        ]);
        promise.then(([userData, isVerified]) => {
          this.setState({
            userData,
            isVerified,
            isAuth: true,
            isDataLoad: true,
          });
        });
      } else {
        this.setState({ isAuth: false, isDataLoad: true });
      }
    });
  }

  render() {
    const { isAuth, isDataLoad, userData, membersData, tasksData, isVerified } = this.state;
    return (
      <>
        {isDataLoad ? (
          <Router>
            <Switch>
              <PrivateRoute
                condition={isAuth}
                userData={userData}
                membersData={membersData}
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
                tasksData={tasksData}
                membersData={membersData}
                component={Tasks}
                path='/tasks'
                redirectPath='/'
                exact
              />
              <PrivateRoute
                condition={isAuth}
                userData={userData}
                tasksData={tasksData}
                component={TaskTracks}
                path='/member/:userId/:page/:taskId/track'
                redirectPath='/'
                exact
              />
              <PrivateRoute
                condition={isAuth && !isVerified}
                userData={userData}
                tasksData={tasksData}
                component={PasswordChange}
                path='/password-change'
                redirectPath='/members'
                exact
              />
              {isAuth ? <Redirect to='/password-change' /> : <Route path='/' render={(props) => <Login />} />}
            </Switch>
          </Router>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
