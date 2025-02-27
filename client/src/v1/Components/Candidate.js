import React, {useState, useEffect} from "react";
//import './styles/style.css';
function Candidate({isVisible, onClose, children}) {
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(()=>{
        if(isVisible)
        {
                setIsAnimating(true);
        }
        else{
            const timer = setTimeout(()=> setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isVisible])

    if (!isAnimating && !isVisible) {
        return null;
    }
    return( 
        <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-xs flex justify-center items-center border-md ${isVisible ? 'animate-show' : 'animate-hide'}`}  id="wrapper" onClick={handleClose}>
            <div className="w-[1240px]  md:max-h-[500px] overflow-y-auto rounded-sm">
                {/* <button className="text-white text-xl place-self-end justify-end" onClick={()=>onClose()}>X</button> */}
                <div className="bg-white rounded">
                      {children}
                </div>
            </div>
        </div>
    )
}

export default Candidate;
  