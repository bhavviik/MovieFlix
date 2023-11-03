import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()

    const navigate = useNavigate()

    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const validate = (e) => {
        e.preventDefault()
        const passErr = document.getElementById("passwordError");
        if (!validPassword.test(password)) {
           passErr.style.display = "block"
        }
        else {
           passErr.style.display = "none"
            handleSubmit()
        }
    }

    const handleSubmit = (e) => {
        if (password === confirmPass) {
            axios.post('http://localhost:3001/Signup', { name, email, password, confirmPass })
                .then(result => {
                    if(result.data.status === "Not Success")
                    {
                        document.getElementById("EmailAlreadyExist").innerText = "You already Have an account with this email !!"
                    }
                    else{
                        navigate('/Signin')
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            document.getElementById("PCPDontMatch").innerText = "Password And Confirm Password Don't Match"
        }
    }

    return (
        <>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 mt-20">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            <Link to='/' >
                                <img src='./src/assets/Images/logo-no-background.png' className='MainLogo' />
                            </Link>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black mt-10">
                            Sign up to create account
                        </h2>

                        <form onSubmit={validate} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <span id='EmailAlreadyExist' className='text-red-700 font-semibold'></span>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Confirm Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Confirm Password"
                                            id="ConfirmPassword"
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            required
                                        ></input>
                                        <span id="PCPDontMatch" className='text-sm text-red-600 font-bold'></span>
                                    </div>
                                    <p id='PassDontMatch' className='text-red-700 font-semibold'></p>
                                    <div id='passwordError' className='hidden w-auto text-red-700 font-semibold text-xs'>
                                        Password must contain -
                                        <ul>
                                            <li>-Password must be greater then 6</li>
                                            <li>-Password must contain 1 Upppercase and 1 lowercase character</li>
                                            <li>-Password must contain special character and number</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-black inline-flex items-center justify-center hover:bg-white w-full hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mt-10"
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                                <p className="mt-2 text-center text-base text-gray-600">
                                    Already have an account?{' '}
                                    <Link to='/Signin'
                                        className="font-medium text-black transition-all duration-200 hover:underline"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}
