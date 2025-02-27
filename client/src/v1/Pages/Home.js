import React from 'react'
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCalendar,  faCircle, faCircleExclamation, faDotCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
function Home() {
  return (
    <div className="flex">
        <div className="bg-[#1D2753]">
            <SideBar />
        </div>
        <div className="ms-[69px] flex-grow">
            <NavBar />
            <div className="mx-10 my-5">
                    <div className="grid grid-cols-2 gap-5">
                            <div className="border">
                                  <div className="flex justify-between gap-2 px-2 py-2 text-green-600 border-b">
                                        <div className="flex gap-2">
                                                <div className="text-lg"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                                                <div className="text-lg">Tickets</div>
                                        </div>
                                        <div className="flex">
                                            <div></div>
                                            <a href="/oie/create_ticket" className="border text-sm p-1"><FontAwesomeIcon icon={faAdd}/> Create a ticket</a>
                                        </div>
                                   </div>  
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-green-500"><FontAwesomeIcon icon={faCircle}/></div>
                                                <div className="text-md">New</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-green-300"><FontAwesomeIcon icon={faDotCircle}/></div>
                                                <div className="text-md">Processing (assigned) </div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-gray-500"><FontAwesomeIcon icon={faCalendar}/></div>
                                                <div className="text-md">Processing (Planned)</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-orange-500"><FontAwesomeIcon icon={faCircle}/></div>
                                                <div className="text-md">Pending</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-gray-500"><FontAwesomeIcon icon={faDotCircle}/></div>
                                                <div className="text-md">Solved</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2 border-b">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-gray-500"><FontAwesomeIcon icon={faCircle}/></div>
                                                <div className="text-md">Closed</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>
                                   <div className="flex justify-between px-2 py-2">
                                            <div className="flex gap-1">
                                                <div className="text-xs pt-1 text-red-500"><FontAwesomeIcon icon={faTrash}/></div>
                                                <div className="text-md">Deleted</div>
                                            </div>
                                            <div className="bg-gray-300 p-[2px] rounded">0</div>
                                   </div>

                            </div>
                    </div>
            </div>
           
        </div>

    </div>
  )
}

export default Home