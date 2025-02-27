import React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";
import img1 from '../Assets/croom.png';
import img2 from '../Assets/meetingroom.png';

const ConferenceBooking = () => {
  const navigate = useNavigate();

  const handleRoomClick = (roomNumber) => {
    navigate(`/oie/calendar/${roomNumber}`);
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
        <SideBar />
      </div>
      <div className="ms-[69px] flex-grow">
        <NavBar />
        <div className="mx-10 my-5">
          <div className="grid grid-cols-2 gap-10">
            <div className="border rounded-lg">
              <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                <button className="flex gap-4 items-center" onClick={() => handleRoomClick(101)}>
                  <div className="text-lg ">Conference Room 101</div>
                  <img src={img1} alt="icon" className="w-14 h-14" />
                </button>
              </div>
            </div>
            <div className="border rounded-lg">
              <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                <button className="flex gap-4 items-center" onClick={() => handleRoomClick(102)}>
                  <div className="text-lg">Conference Room 102</div>
                  <img src={img1} alt="icon" className="w-14 h-14" />
                </button>
              </div>
            </div>
            <div className="border rounde-lg">
              <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                <button className="flex gap-4 items-center" onClick={() => handleRoomClick(1)}>
                  <div className="text-lg">Meeting Room 1</div>
                  <img src={img2} alt="icon" className=" ml-[30px] w-[100px] h-[70px]"/>
                </button>
              </div>
            </div>
            <div className="border rounded-lg">
              <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                <button className="flex gap-4 items-center" onClick={() => handleRoomClick(2)}>
                  <div className="text-lg">Meeting Room 2</div>
                  <img src={img2} alt="icon" className='ml-[30px] w-[100px] h-[70px]'/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceBooking;