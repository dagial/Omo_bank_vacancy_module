import Login from './pages/Login'
import Register from './pages/registry'
import NavBar from './components/NavBar'
import NotFound from './pages/404'
import Faqs from './pages/Faqs'
import About from './pages/about'
import UserHome from './pages/recruithome'
import Jobs from './pages/jobs'
import JobDetail from './pages/jobdetail'
import UserCalendar from './pages/calendar'
import Requests from './pages/requests'
import EditRequest from './pages/editRequest'
import NewRequest from './pages/newJob'
import Settings from './pages/settings'
import Applications from './pages/applications'
import Candidates from './pages/candidates'
import ApplicationDetail from './pages/appDetail'
import Analytics from './pages/analytics'
import LandingPage from './pages/landingPage.component'
import ResetPassword from './pages/resetPassword'
import ResetPasswordConfirm from './pages/resetPasswordConfirm'
import Activate from './pages/activate'
import Skeleton from "./pages/skeleton/skeleton.route"
import RegiSkeleton from './pages/registration-skeleton/registraion-skeleton.component'
import Registration2 from './pages/registartion/retgistration2/registration2.component'
import Detail from './pages/detail/detail.component'
import { Provider } from 'react-redux'
import store from './components/store'
import { Link, Route, Routes } from 'react-router-dom'
import Layout from './hocs/Layout'

function App() {
  const user=true
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="registration" element={<Skeleton/>}>
          <Route path="" element={<RegiSkeleton/>}>
            <Route index element={<Registration2/>}/>
            <Route path="edit/:id" element={<Detail />} />
          </Route>
          </Route>
          <Route path="/home" element={<UserHome />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/calendar" element={<UserCalendar />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/requests/:id" element={<EditRequest />} />
          <Route path="/requests/new" element={<NewRequest />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
