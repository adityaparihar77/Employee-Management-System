import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[220px] sm:w-[300px] p-3 sm:p-5 bg-blue-400 rounded-xl'>
        <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded'>{data.category}</h3>
            <h4 className='text-xs sm:text-sm'>{data.taskDate}</h4>
        </div>
        <h2 className='mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold'>{data.taskTitle}</h2>
        <p className='text-xs sm:text-sm mt-2'>
            {data.taskDescription}
        </p>
        <div className='mt-4 sm:mt-6'>
            <button className='w-full bg-green-600 rounded font-medium py-1 px-2 text-xs'>Complete</button>
        </div>
    </div>
  )
}

export default CompleteTask