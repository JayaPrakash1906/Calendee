import React from "react";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import img1 from "../Assets/croom.png";
import img2 from "../Assets/techinical support.png";
import img3 from "../Assets/biometric.png";
import img4 from "../Assets/other.png";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const navigate = useNavigate()
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
                                    <button className="flex gap-4 items-center"onClick={() => navigate("/oie/calendar")}>    
                                                <div className="text-lg ">Conference Room Booking Request</div>
                                                <img src={img1} alt="icon" className="w-14 h-14" />
                                    </button>
                            </div>
                    </div>
                    <div className="border rounded-lg">
                            <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                                    <button className="flex gap-4 items-center"onClick={() => navigate("/oie/create_ticket")}>
                                                <div className="text-lg">Technical Assistance Request</div>
                                                <img src={img2} alt="icon" className="w-14 h-14 ml-[38px]" />
                                    </button>
                            </div>
                    </div>
                    <div className="border rounded-lg">
                            <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                                    <button className="flex gap-4 items-center"onClick={() => navigate("/oie/biometric")}>
                                                <div className="text-lg">Biometric Access  Request</div>
                                                <img src={img3} alt="icon" className="w-14 h-14 ml-[75px]" />
                                    </button>
                            </div>
                    </div>
                    <div className="border rounded-lg">
                            <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                                    <button className="flex gap-4 items-center" onClick={() => navigate("/oie/other_request")}>
                                                <div className="text-lg">Other Requests</div>
                                                <img src={img4} alt="icon" className="w-14 h-14 ml-[150px]" />
                                    </button>
                            </div>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;