import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import AddConnections from "../Components/AddConnections";
import EstablishConnections from "../Components/EstablishConnections";
import { FaPlusCircle, FaSearch, FaTag } from "react-icons/fa";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import '../Components/styles/style.css';

function OtherRequest() {
    // State for popup visibility
    const [openPopUp, setOpenpopup] = useState(false);
    const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
    
    // State for form data
    const [addConnection, setAddConnection] = useState({
        name: '',
        designation: '',
        organisation: '',
        connect_for: '',
        contact_number: '',
        email_address: ''
    });

    const [establishConnection, setEstablishConnection] = useState({
        startup: '',
        connection: '',
        email_content: '',
        user_role: 1
    });

    // Sample data - in a real app, this would come from an API
    const [connections, setConnections] = useState([
        { email_address: 'manager.ie@imail.iitm.ac.in', connect_for: 'Nandhini K S' },
        { email_address: 'om.ie@imail.iitm.ac.in', connect_for: 'Manoranjani M' },
        { email_address: 'finance.ie@imail.iitm.ac.in', connect_for: 'Krishnaveni' },
        { email_address: 'cm.ie@imail.iitm.ac.in', connect_for: 'Sathyajit Seal' },
        { email_address: 'pm.ie@imail.iitm.ac.in', connect_for: 'Sundar Raj E' }

    ]);

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    // Handler functions
    const handleShow = () => setOpenpopup(true);
    const handleEstablish = () => setOpenEstablishPopUp(true);

    const handleAddConnectionChange = (e) => {
        const { name, value } = e.target;
        setAddConnection(prev => ({ ...prev, [name]: value }));
    };

    const handleEstablishChange = (e) => {
        const { name, value } = e.target;
        setEstablishConnection(prev => ({ ...prev, [name]: value }));
    };

    const handleAddConnectionSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would call an API here
        console.log('Add connection:', addConnection);
        setOpenpopup(false);
    };

    const handleEstablishSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would call an API here
        console.log('Establish connection:', establishConnection);
        setOpenEstablishPopUp(false);
    };

    const handleDeleteConnection = (email) => {
        // In a real app, you would call an API here
        console.log('Delete connection:', email);
    };

    return (
        <div className="flex">
            <div className="bg-[#1D2753]">
                <SideBar />
            </div>
            
            <div className="ms-[69px] flex-grow">
                <NavBar />
                
                <div className={`p-[90px;] h-full`}>
                    <h1 className="text-3xl font-semibold text-gray-500">Connections</h1>
                    
                    <div className={`grid grid-cols-3 mt-7 gap-10 content ${show ? "visible" : ""}`}>
                        {/* Add Connection Card */}
                        <div className="shadow-md font-semibold rounded-lg w-[100%]" style={{ backgroundColor: '#afdade' }}>
                            <div className="flex justify-center items-center">
                                <button 
                                    className="px-3 py-4 active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" 
                                    style={{ color: '#0b5f66' }} 
                                    onClick={handleShow}
                                >
                                    <FaPlusCircle size={55} />
                                </button>
                            </div>
                            <div className="text-center text-gray-500">ADD CONNECTION</div>
                        </div>
                        
                        {/* Connection Cards */}
                        {connections.map((connection, index) => (
                            <div key={index} className="shadow-md font-semibold rounded-lg w-[100%]" style={{ backgroundColor: '#afdade' }}>
                                <div className="flex justify-between p-3 text-xs border-b">
                                    <div className="text-sm">ID: {connection.email_address}</div>
                                    <div className="flex gap-2 pt-1">
                                        <button className="text-gray-500" onClick={() => handleDeleteConnection(connection.email_address)}>
                                            <FaTrashCan size={14} />
                                        </button>
                                        <button className="text-gray-500" onClick={handleEstablish}>
                                            <FaTag size={14} />
                                        </button>
                                        <button className="text-gray-500">
                                            <FaPencil size={14} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:p-6 mb-1">
                                    <div className="flex justify-start items-start scale-[1.08] text-md">
                                        <span style={{ color: '#0b5f66' }}>{connection.connect_for}</span>
                                    </div>
                                    <div className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all flex justify-end items-end" style={{ color: '#0b5f66' }}>
                                        <button>
                                            <FaSearch size={28} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Add Connection Modal */}
                <AddConnections isVisible={openPopUp} onClose={() => setOpenpopup(false)}>
                    <h1 className="text-xl p-3 pb-3 text-gray-500">Register for new connection</h1>
                    <form onSubmit={handleAddConnectionSubmit}>
                        <div className="grid grid-cols-2 p-3 gap-4">
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'designation', label: 'Designation' },
                                { name: 'organisation', label: 'Organisation' },
                                { name: 'connect_for', label: 'Connect For?' },
                                { name: 'contact_number', label: 'Contact Number' },
                                { name: 'email_address', label: 'Email Address' }
                            ].map((field) => (
                                <div key={field.name} className="relative">
                                    <input
                                        type="text"
                                        id={`add-${field.name}`}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        name={field.name}
                                        onChange={handleAddConnectionChange}
                                    />
                                    <label
                                        htmlFor={`add-${field.name}`}
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
                                        {field.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all"
                                style={{ backgroundColor: '#afdade' }}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </AddConnections>
                
                {/* Establish Connection Modal */}
                <EstablishConnections isVisible={openEstablishPopUp} onClose={() => setOpenEstablishPopUp(false)}>
                    <form onSubmit={handleEstablishSubmit}>
                        <h1 className="text-gray-500 text-xl">Tag Connection</h1>
                        <div className="grid grid-cols-2 p-3 gap-4 mt-3">
                            <div>
                                <select
                                    id="startup-select"
                                    name="startup"
                                    onChange={handleEstablishChange}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Startup</option>
                                    {connections.map((connection, index) => (
                                        <option key={`startup-${index}`} value={connection.email_address}>
                                            {connection.email_address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select
                                    id="connection-select"
                                    name="connection"
                                    onChange={handleEstablishChange}
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Contact</option>
                                    {connections.map((connection, index) => (
                                        <option key={`contact-${index}`} value={connection.email_address}>
                                            {connection.connect_for}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="p-3">
                            <textarea
                                name="email_content"
                                onChange={handleEstablishChange}
                                className="w-full resize-none rounded-md md:h-[100px]"
                                placeholder="Email Content"
                            ></textarea>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all"
                                style={{ backgroundColor: '#afdade' }}
                            >
                                Tag Connection
                            </button>
                        </div>
                    </form>
                </EstablishConnections>
            </div>
        </div>
    );
}

export default OtherRequest;

















































// import React, { useState, useEffect } from "react";
// import SideBar from "../Components/SideBar";
// import NavBar from "../Components/NavBar";
// import AddConnections from "../Components/AddConnections";
// import EstablishConnections from "../Components/EstablishConnections";
// import {  FaPlusCircle, FaSearch, FaTag } from "react-icons/fa";
// import { FaGear, FaPage4, FaPencil, FaTrashCan } from "react-icons/fa6";
// import '../Components/styles/style.css';
// import toast from 'react-hot-toast';

// function OtherRequest() {
//     const [openPopUp, setOpenpopup] = useState(false);
//     const handleShow = () => setOpenpopup(true);
//     const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
//     const handleEstablish = () => setOpenEstablishPopUp(true);

//     const [AddConnection, setAddConnection] = useState({
//         name: '',
//         designation: '',
//         organisation: '',
//         connect_for: '',
//         contact_number: '',
//         email_address: ''
//     });

//     const [EstablishConnection, setEstablishConnection] = useState({
//         startup: '',
//         connection: '',
//         email_content: '',
//         user_role: 1 // Assuming a default role for demonstration
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddConnection((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleChangeEst = (e) => {
//         const { name, value } = e.target;
//         setEstablishConnection((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleClick = async (e) => {
//         e.preventDefault();
//         toast.success('Connection Added (Simulated)');
//         setOpenpopup(false);
//     };

//     const EstablishButton = async (e) => {
//         e.preventDefault();
//         toast.success('Request Sent (Simulated)');
//         setOpenEstablishPopUp(false);
//     };

//     const deleteConnection = async (email_address) => {
//         toast.success('Delete Successful (Simulated)');
//     };

//     const [data, setData] = useState([
//         { email_address: 'example1@example.com', connect_for: 'Example Connection 1' },
//         { email_address: 'example2@example.com', connect_for: 'Example Connection 2' }
//     ]);

//     const [show, setShow] = useState(false);

//     useEffect(() => {
//         setShow(true);
//     }, []);

//     return (
//       <div className="flex">
//       <div className="bg-[#1D2753]">
//         <SideBar />
//       </div>
//       <div className="ms-[69px] flex-grow">
//         <NavBar />
//                 <div className={`p-[90px;] h-full`}>
//                     <h1 className="text-3xl font-semibold text-gray-500">Connections</h1>
//                     <div className={`grid grid-cols-3 mt-7 gap-10 content ${show ? "visible" : ""}`}>
//                         <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{ backgroundColor: '#afdade' }}>
//                             <div className="flex justify-center items-center ">
//                                 <button className="px-3 py-4 active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" style={{ color: '#0b5f66' }} onClick={handleShow}>
//                                     <FaPlusCircle size={55} />
//                                 </button>
//                             </div>
//                             <div className="text-center text-gray-500">ADD CONNECTION</div>
//                         </div>
//                         {data.map((dataObj, index) => {
//                             let email_address = dataObj.email_address;
//                             return (
//                                 <div key={index} className="shadow-md font-semibold rounded-lg w-[100%;]" style={{ backgroundColor: '#afdade' }}>
//                                     <div className="flex justify-between p-3 text-xs border-b">
//                                         <div className="text-sm">ID: {dataObj.email_address}</div>
//                                         <div className="pt-1">
//                                             <button className="text-gray-500" onClick={() => deleteConnection(email_address)}>
//                                                 <FaTrashCan size={14} />
//                                             </button>
//                                         </div>
//                                         <div className="pt-1">
//                                             <button className="text-gray-500" onClick={handleEstablish}>
//                                                 <FaTag size={14} />
//                                             </button>
//                                         </div>
//                                         <div className="pt-1">
//                                             <button className="text-gray-500">
//                                                 <FaPencil size={14} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-2 md:p-6 mb-1">
//                                         <div className="flex justify-start items-start scale-[1.08] text-md">
//                                             <span className="" style={{ color: '#0b5f66' }}>{dataObj.connect_for}</span>
//                                         </div>
//                                         <div className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all flex justify-end items-end" style={{ color: '#0b5f66' }}>
//                                             <button>
//                                                 <FaSearch size={28} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
            
//             <AddConnections isVisible={openPopUp} onClose={() => setOpenpopup(false)}>
//                 <h1 className="text-xl p-3 pb-3 text-gray-500">Register for new connection</h1>
//                 <form onSubmit={handleClick}>
//                     <div className="grid grid-cols-2 p-3 gap-4">
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="name" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
//                         </div>
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="designation" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Designation</label>
//                         </div>
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="organisation" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Organisation</label>
//                         </div>
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="connect_for" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Connect For?</label>
//                         </div>
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="contact_number" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contact Number</label>
//                         </div>
//                         <div className="relative">
//                             <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="email_address" onChange={handleChange} />
//                             <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email Address</label>
//                         </div>
//                     </div>
//                     <div className="flex justify-center items-center">
//                         <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" style={{ backgroundColor: '#afdade' }}>Register</button>
//                     </div>
//                 </form>
//             </AddConnections>
//             <EstablishConnections isVisible={openEstablishPopUp} onClose={() => setOpenEstablishPopUp(false)}>
//                 <form onSubmit={EstablishButton}>
//                     <h1 className="text-gray-500 text-xl">Tag Connection</h1>
//                     <div className="grid grid-cols-2 p-3 gap-4 mt-3">
//                         <div>
//                             <select id="small" name="startup" onChange={handleChangeEst} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                                 <option selected>Select Startup</option>
//                                 {data.map((dataObj, Index) => {
//                                     return <option key={Index} value={dataObj.email_address}>{dataObj.email_address}</option>
//                                 })}
//                             </select>
//                         </div>
//                         <div>
//                             <select id="small" name="connection" onChange={handleChangeEst} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                                 <option selected>Select Contact</option>
//                                 {data.map((dataObj, Index) => {
//                                     return <option key={Index} value={dataObj.email_address}>{dataObj.connect_for}</option>
//                                 })}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="p-3">
//                         <textarea name="email_content" onChange={handleChangeEst} className="w-full resize-none rounded-md md:h-[100px]" placeholder="Email Content"></textarea>
//                     </div>
//                     <div className="flex justify-center items-center">
//                         <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" style={{ backgroundColor: '#afdade' }}>Tag Connection</button>
//                     </div>
//                 </form>
//             </EstablishConnections>
//         </div>
//       </div>
//     );
// }

// export default OtherRequest;