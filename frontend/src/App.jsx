
import './App.css'
import SelectSignUp from './components/SelectSignUp';
import WeatherConditions from './components/WeatherConditions';
import AirQuality from './components/AirQuality';
import TempHumidity from './components/TempHumidity';
import Home from './components/Home';
import Main from './components/Main';
import ContactUs from './components/ContactUs';

import SignUp from './components/SignUp';
import EmergencyRespSignUp from "./components/EmergencyRespSignUp";
import GovernementAuthSignUp from "./components/GovernmentAuthSignUp";

import GovernmentAuthVallidation from "./components/GovernmentAuthVallidation"
import EmergencyRespondesrValidation  from './components/EmergencyRespValidation';
import GeneralPublicValidation from './components/GeneralUserValidation';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {path:"/", element: <Home />},
  {path:"/select-sign-up", element: <SelectSignUp />},
  {path: "/main", element:<Main />},
  {path: "/contact-us", element:<ContactUs />},

  {path:"/weatherData", element: <WeatherConditions />},
  {path:"/airQuality", element: <AirQuality />},
  {path:"/temp-humidity", element: <TempHumidity />},

  {path:"/genral-public-sign-up", element: <SignUp />},
  {path:"/government-auth-sign-up", element: <GovernementAuthSignUp />},
  {path:"/emergency-resp-sign-up", element: <EmergencyRespSignUp />},

  {path:"/genral-public-validation", element: <GeneralPublicValidation />},
  {path:"/government-auth-validation", element: <GovernmentAuthVallidation />},
  {path:"/emergency-resp-validation", element: <EmergencyRespondesrValidation />},

])

function App() {
  return (
      <RouterProvider router={router} />
  );
}


export default App
