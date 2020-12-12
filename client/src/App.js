import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { SETTINGS_PATH, LOGIN_PATH,DASHBOARD_FILTERS_PATH, REGISTER_PATH,DASHBOARD_NOT_ADDED_PATH, DASHBOARD_PATH, WIFI_SETUP_PATH } from './Constants/const'
import { Spinner } from 'react-bootstrap';
import './App.scss';
import Prompt from './Components/Prompt/Prompt'

const Login = React.lazy(() => import('./Components/Login/Login'));
const Register = React.lazy(() => import('./Components/Register/Register'));
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));
const Wifi = React.lazy(() => import('./Components/Wifi/Wifi'));
const DashboardNotAdded = React.lazy(() => import('./Components/DashboardNotAdded/DashboardNotAdded'));
const DashboardFilters = React.lazy(() => import('./Components/DashboardFilters/DashboardFilters'));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavigationBar />
        <Suspense fallback={<Spinner animation="border" className="spinner" />}>
          <Prompt />
          <Switch>
          <Route path={DASHBOARD_PATH} exact component={Dashboard} />
            <Route path={LOGIN_PATH} exact component={Login} />
            <Route path={REGISTER_PATH} exact component={Register} />
            <Route path={SETTINGS_PATH} exact component={Settings} />
            <Route path={WIFI_SETUP_PATH} exact component={Wifi} />
            <Route path={DASHBOARD_NOT_ADDED_PATH} exact component={DashboardNotAdded} />
            <Route path={DASHBOARD_FILTERS_PATH} exact component={DashboardFilters} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
