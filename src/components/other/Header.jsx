import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    // window.location.reload()
  }

  
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0'>
        <h1 className='text-xl sm:text-2xl font-medium'>Hello <br /> <span className='text-2xl sm:text-3xl font-semibold'>username 👋</span></h1>
        <button onClick={logOutUser} className='bg-red-600 text-sm sm:text-base font-medium text-white px-4 sm:px-5 py-2 rounded-sm mt-2 sm:mt-0'>Log Out</button>
    </div>
  )
}

export default Header