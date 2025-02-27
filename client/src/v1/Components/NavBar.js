import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faGear, faAdd, faHome} from '@fortawesome/free-solid-svg-icons';
import userphoto from '../Assets/user-thumbnail.png';
function NavBar() {
    const currentPath = window.location.pathname;  
    const Leave = currentPath === '/oie/leave';
    const attendance = currentPath === '/oie/attendance';
    const Home = currentPath === '/oie/home';
    const LandingPage = currentPath === '/';
    const OnBoarding = currentPath === '/oie/create_ticket';
    const TimeTraker = currentPath === '/oie/time-tracker'
    return (
            <nav className="border-gray-200 bg-[#2F3B5F]">
                <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3 md:p-3">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {Home && (
                        <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">Home</li>
                        </ul>
                    )}
                    {Leave && (
                        <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">My Data</li>
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">Team</li>
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">Holidays</li>
                        </ul>
                    )}
                    {OnBoarding && (
                        <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA] text-sm"><span><FontAwesomeIcon icon={faHome} />    </span> Home</li>
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA] text-sm">/</li>
                            <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA] text-sm"><span><FontAwesomeIcon icon={faAdd} />    </span>Create a Ticket</li>
                        </ul>
                    )}
                    {attendance && (
                        <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">My Data</li>
                                <li className="text-white font-medium hover:underline hover:underline-offset-[14px] hover:decoration-4 hover:decoration-[#1F8AFA]">Team</li>
                        </ul>
                    )}
                    </a>
                    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                    <a href="#" className="block py-1 px-3 md:p-0 text-white rounded hover:font-medium" aria-current="page"><FontAwesomeIcon icon={faAdd} /></a>
                            </li>
                            <li>
                                    <a href="#" className="block py-1 px-3 md:p-0 text-white rounded hover:font-medium" aria-current="page"><FontAwesomeIcon icon={faSearch} /></a>
                            </li>
                            <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:dark:bg-transparent" aria-current="page"><FontAwesomeIcon icon={faBell} /></a>
                            </li>
                            <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:dark:bg-transparent" aria-current="page"><FontAwesomeIcon icon={faGear} /></a>
                            </li>
                            <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:dark:bg-transparent" aria-current="page"><img src={userphoto} className="w-[24px] rounded-xl"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
  )
}

export default NavBar