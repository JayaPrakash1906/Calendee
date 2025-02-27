import React from 'react'
import SideBar from '../Components/SideBar'
import NavBar from '../Components/NavBar'

// import img from '../Assets/10681.jpg';
function Leave() {
  return (
    <div className="flex">
        <div className="bg-[#1D2753]">
            <SideBar />
        </div>
        <div className="ms-[69px] flex-grow">
            <NavBar />
            <div className="border w-full">
                <ul className="flex flex-row space-x-5 p-3">
                        <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Leave Summary</li>
                        <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Leave Balance</li>
                        <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Leave Request</li>
                        <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Shift</li>
                </ul>
            </div>
            <div className="border bg-[#EDF0F4]">
                <div className="grid grid-cols-4">
                        <div className="col-span-1">
                            <div className="border m-5 bg-white p-10">
                                    <div className="flex justify-center items-center"><img src="" alt='' /></div>
                                    <div className="mt-3">1-<span className="font-semibold">Manager.ie</span></div>
                                    <div className="text-yellow-500">Weekend</div>
                                    <div className="mt-2"><span className="bg-gray-200 p-1 rounded-xl">00</span> : <span className="bg-gray-200 p-1 rounded-xl">00</span> : <span className="bg-gray-200 p-1 rounded-xl">00</span></div>
                                    <div className="mt-5"><button className="outline outline-green-500 outline-1 text-green-500 p-1 rounded-lg">Check-In</button></div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="border m-5 bg-white p-3">
                                    <ul className="flex justify-between text-sm">
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Activities</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Feeds</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Profile</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Approvals</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Leave</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Attendance</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Time Logs</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Timesheets</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Jobs</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Files</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">HR Process</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Career History</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Cases</li>
                                            <li className="hover:font-semibold hover:underline hover:underline-offset-[14px] hover:decoration-2 hover:decoration-[#1F8AFA]">Goals</li>
                                    </ul>     
                            </div>
                            <div className="border m-5 bg-white p-3 max-h-[350px]">
                                    <div className="flex justify-center "><img src="" className="w-[25%]"/></div>
                                    <div className="text-lg font-medium">Nothing to view!</div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Leave