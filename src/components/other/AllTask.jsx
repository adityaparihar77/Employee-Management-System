import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

   const [userData,setUserData] =  useContext(AuthContext)

   
  return (
    <div className='bg-[#1c1c1c] p-3 sm:p-5 rounded mt-5 overflow-x-auto'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex min-w-[600px] justify-between rounded text-xs sm:text-lg'>
            <h2 className='font-medium w-1/5'>Employee Name</h2>
            <h3 className='font-medium w-1/5'>New Task</h3>
            <h5 className='font-medium w-1/5'>Active Task</h5>
            <h5 className='font-medium w-1/5'>Completed</h5>
            <h5 className='font-medium w-1/5'>Failed</h5>
        </div>
        <div>
        {userData.map(function(elem,idx){
            return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex min-w-[600px] justify-between rounded text-xs sm:text-lg'>
            <h2 className='font-medium w-1/5'>{elem.firstName}</h2>
            <h3 className='font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
            <h5 className='font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
            <h5 className='font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
            <h5 className='font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
        </div>
        })}
        </div>
        
        
    </div>
  )
}

export default AllTask