import './App.css';
import Home from './v1/Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Leave from './v1/Pages/Leave';
import Attendance from './v1/Pages/Attendance';
import CreateTicket from './v1/Pages/CreateTicket';
import Tickets from './v1/Pages/Tickets';
import Boooking from './v1/Components/BookingPage';
import CalendarView from './v1/Pages/CalendarView';
import LandingPage from './v1/Pages/LandingPage';
import ConferenceBooking from './v1/Components/ConferenceBooking';
import BiometricAccess from './v1/Pages/BiometricAccess';
import OtherRequest from './v1/Pages/OtherRequest';


function App() {
  return (
    <div className="App dm-sans">
      {/* <Home /> */}
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}></Route>
              <Route path="/oie/home" element={<Home/>}></Route>
              <Route path="/oie/create_ticket" element={<CreateTicket />}></Route>
              <Route path="/oie/leave" element={<Leave />}></Route>
              <Route path="/oie/attendance" element={<Attendance />} ></Route>
              <Route path="/oie/tickets" element={<Tickets />} ></Route>
              <Route path="/oie/booking" element={<Boooking />} ></Route>
              <Route path="/oie/calendar/:roomNumber" element={<CalendarView />} ></Route> 
              <Route path="/oie/faq" element={<Home />} ></Route>
              <Route path="/oie/conference" element={<ConferenceBooking />} ></Route>
              <Route path="/oie/biometric" element={<BiometricAccess />} ></Route>
              <Route path="/oie/other_request" element={<OtherRequest />} ></Route>
              

          </Routes>
      </BrowserRouter>
        {/* <SideBar /> */}
    </div>
  );
}

export default App;
