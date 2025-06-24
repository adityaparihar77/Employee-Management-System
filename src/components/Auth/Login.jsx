import React, { useState } from 'react'

const Login = ({handleLogin}) => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }


  return (
    <div className='flex h-screen w-screen items-center justify-center relative'>
        <img src='/home.png' alt='Background' className='absolute inset-0 w-full h-full object-cover object-center z-0 select-none pointer-events-none' style={{minHeight: '100vh', minWidth: '100vw'}} />
        <div className='border-2 rounded-xl border-emerald-600 p-5 sm:p-20 w-full max-w-xs sm:max-w-md bg-white/80 backdrop-blur-md z-10'>
            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col items-center justify-center text-black'
            >
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-base sm:text-lg py-2 px-4 sm:px-6 rounded-full placeholder:text-gray-400 w-full' type="email" placeholder='Enter your email' 
                />
                <input
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-base sm:text-lg py-2 px-4 sm:px-6 rounded-full mt-3 placeholder:text-gray-400 w-full' type="password" placeholder='Enter password' />
                <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-base sm:text-lg py-2 px-6 sm:px-8 w-full rounded-full placeholder:text-white'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Login