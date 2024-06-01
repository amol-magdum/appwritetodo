import React from 'react'
import { useNavigate } from 'react-router-dom'

function Success(props='guest') {

    let navigate = useNavigate();

    const handleLoginClick=() =>{
        navigate("/");
    }

    const handleCloseClick=()=>{
        navigate("/signup");
    }
  return (

    <div className="flex flex-col justify-center pt-4 bg-transparent">
    <div className="w-full max-w-sm mx-auto my-2 overflow-hidden rounded shadow-sm">
        <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-green-500">
            <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="inline w-6 h-6 mr-2 opacity-75">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Success</span>
            </div>

        </div>
        <div className="p-3 bg-white border border-gray-300 rounded-b">
            <div className="flex justify-center mb-3">
                <div> 
                 <span className="mb-2 block leading-tight text-gray-500">Welcome {props.user.name}, Your account is created.</span>
                 <span className="mb-2 block leading-tight text-gray-500">Use <span className='text-red-900'>"{props.user.email}"</span> for login.</span>
                 <span className="mb-2 block leading-tight text-gray-500">Reach out to admin for verification.</span>
                </div>
            </div>
            <div className="block w-full mt-3 text-right">
                
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={handleLoginClick}
                    >
                    Log in
                </button>

            </div>
        </div>
    </div>

    
   
</div>

  )
}

export default Success