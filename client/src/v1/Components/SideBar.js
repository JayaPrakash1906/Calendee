import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../Assets/oielogo.png';
import {faHome, faCalendar,  faAdd, faExclamationCircle,  faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate()
  return (
    <div className="w-[69px] h-screen bg-[#1D2753] fixed">
            <ul className="py-5">
                <li className="text-white pb-4">
                    <div className="pb-1 mb-1 flex justify-center items-center"><img src={img} className="w-[50%]" onClick={() => navigate("/")}/></div>
                </li>
                <li className="text-white pb-6">
                    <a href="/oie/home">  
                        <div className="text-xl pb-1 mb-1"><span className="hover:bg-[#1F8AFA] bg-[#232D63] p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /></span></div>
                        <div className="text-[11px]">Home</div>
                    </a>
                </li>
                <li className="text-white pb-6">
                    <a href="/oie/create_ticket">
                        <div className="text-xl pb-1 mb-1"><span className="hover:bg-[#1F8AFA] bg-[#232D63] p-2 rounded-xl"><FontAwesomeIcon icon={faExclamationCircle} /></span></div>
                        <div className="text-[11px]">Ticket</div>
                    </a>
                </li>
                <li className="text-white pb-6">
                    <a href="/oie/tickets">
                            <div className="text-xl pb-1 mb-1"><span className="hover:bg-[#1F8AFA] bg-[#232D63] p-2 rounded-xl"><FontAwesomeIcon icon={faAdd} /></span></div>
                            <div className="text-[11px]">Create a Ticket</div>
                    </a>
                </li>
                <li className="text-white pb-6">
                    <a href="/oie/attendance">
                        <div className="text-xl pb-1 mb-1"><span className="hover:bg-[#1F8AFA] bg-[#232D63] p-2 rounded-xl"><FontAwesomeIcon icon={faCalendar} /></span></div>
                        <div className="text-[11px]">Reservation</div>
                    </a>
                </li>
                <li className="text-white pb-6">
                    <a href="/oie/faq">
                    <div className="text-xl pb-1 mb-1"><span className="hover:bg-[#1F8AFA] bg-[#232D63] p-2 rounded-xl"><FontAwesomeIcon icon={faQuestionCircle} /></span></div>
                    <div className="text-[11px]">FAQs</div>
                    </a>
                </li>
            </ul>   
    </div>
  )
}

export default SideBar