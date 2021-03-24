/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.module.scss';
import { Members } from '../pages/Members';
import { MemberProgress } from '../pages/MemberProgress';
import { Tasks } from '../pages/Tasks';
import { MemberTasks } from '../pages/MemberTasks';
import { TaskTracks } from '../pages/TaskTracks';
import { Loader } from '../components/Loader/Loader';
import { Login } from '../pages/Login';
import { PasswordChange } from '../pages/PasswordChange';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { getUserData, unsubscribeData } from '../store/actions/app';
import { MEMBER } from '../services/fields-template';
import { useTheme } from '../hooks/useTheme';

export const App = () => {
  const {
    app: { userData, isVerified, isDataLoad, isAuth },
  } = useSelector((state) => state);
  const { theme, changeTheme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    changeTheme(userData.theme);

    return () => {
      dispatch(unsubscribeData());
    };
  }, [dispatch, userData.theme]);

  let routes = (
    <Switch>
      <PrivateRoute condition={isAuth} component={Members} path='/members' exact />
      <PrivateRoute condition={isAuth} component={MemberProgress} path='/member/:userId/progress' exact />
      <PrivateRoute condition={isAuth} component={MemberTasks} path='/member/:userId/tasks' exact />
      <PrivateRoute condition={isAuth} component={Tasks} path='/tasks' exact />
      <PrivateRoute
        condition={isAuth && !isVerified}
        component={PasswordChange}
        path='/password-change'
        redirectPath='/members'
        exact
      />
      {isAuth ? <Redirect to='/password-change' /> : <Route path='/' component={Login} />}
    </Switch>
  );

  if (userData.role === MEMBER) {
    routes = (
      <Switch>
        <PrivateRoute condition={isAuth} component={MemberTasks} path='/member/:userId/tasks' exact />
        <PrivateRoute condition={isAuth} component={TaskTracks} path='/member/:userId/tasks/:taskId/track' exact />
        <PrivateRoute
          condition={isAuth && !isVerified}
          component={PasswordChange}
          path='/password-change'
          redirectPath={`/member/${userData.userId}/tasks`}
          exact
        />
        {isAuth ? <Redirect to='/password-change' /> : <Route path='/' component={Login} />}
      </Switch>
    );
  }

  return (
    <>
      {isDataLoad ? (
        <Router>
          <div className={`theme theme-${theme}`}>{routes}</div>
        </Router>
      ) : (
        <Loader />
      )}
    </>
  );
};
