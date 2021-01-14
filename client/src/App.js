import React, { Suspense } from 'react';
import {Col} from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { FAQ_PATH,SETTINGS_PATH,DASHBOARD_COMPARISON_PATH,HOME_PAGE_PATH, LOGIN_PATH,DASHBOARD_FILTERS_PATH, REGISTER_PATH,DASHBOARD_NOT_ADDED_PATH, DASHBOARD_PATH, WIFI_SETUP_PATH, ADMIN_LOGIN_PATH, ADMIN_PATH } from './Constants/const'
import './App.scss';
import Prompt from './Components/Prompt/Prompt'
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-perfect-scrollbar/dist/css/styles.css"
// import "prismjs/themes/prism-tomorrow.css"

const Login = React.lazy(() => import('./Components/Login/Login'));
const Register = React.lazy(() => import('./Components/Register/Register'));
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));
const Wifi = React.lazy(() => import('./Components/Wifi/Wifi'));
const DashboardComparison = React.lazy(() => import('./Components/DashboardComparison/DashboardComparison'));
const DashboardFilters = React.lazy(() => import('./Components/DashboardFilters/DashboardFilters'));
const AdminLogin = React.lazy(() => import('./Components/AdminLogin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./Components/AdminDashboard/AdminDashboard'));
const Faq = React.lazy(() => import('./Components/FAQ/Faq'));
const Home = React.lazy(() => import('./Components/Home/Home'));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavigationBar />
        <Suspense fallback={<Col xs={12} className="d-flex justify-content-center spinner-style"><CircularProgress /></Col>}>
          <Prompt />
          <Switch>
          <Route path={DASHBOARD_PATH} exact component={Dashboard} />
            <Route path={LOGIN_PATH} exact component={Login} />
            <Route path={REGISTER_PATH} exact component={Register} />
            <Route path={SETTINGS_PATH} exact component={Settings} />
            <Route path={WIFI_SETUP_PATH} exact component={Wifi} />
            <Route path={DASHBOARD_COMPARISON_PATH} exact component={DashboardComparison} />
            <Route path={DASHBOARD_FILTERS_PATH} exact component={DashboardFilters} />
            <Route path={ADMIN_LOGIN_PATH} exact component={AdminLogin} />
            <Route path={ADMIN_PATH} exact component={AdminDashboard} />
            <Route path={FAQ_PATH} exact component={Faq} />
            <Route path={HOME_PAGE_PATH} exact component={Home} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
