import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import * as sessionAction from '../../store/session'

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionAction.logout())
    }

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <div className='flex items-center bg-white sticky top-0 py-4 px-24'>
            <h1 className="w-1/3 text-3xl">GiftBox.</h1>
            <div className="w-1/3 text-center text-lg">
                <NavLink to='#' className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Home</NavLink>
                <NavLink to='#' className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Wishlists</NavLink>
                <NavLink to='#' className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Friends</NavLink>
            </div>
            {!sessionUser ? (
                <div className='flex justify-end w-1/3'>
                    <NavLink to='signup' className="text-lg hover:text-indigo-400 hover:underline hover:underline-offset-8">Sign in / Sign up</NavLink>
                </div>
            ) : (
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-1/3 text-end hover:text-indigo-400 hover:underline hover:underline-offset-8">
                    <h3 className='text-lg'>Account</h3>
                    {isOpen && (
                        <ul className='absolute right-[88px] top-12 bg-slate-50 rounded-md text-md text-black min-w-32'>
                            <li className='hover:text-indigo-400 border-b border-black'>
                                <NavLink to='#' className="flex w-full px-4 pb-2 pt-4">My Lists</NavLink>
                            </li>
                            <li className='hover:text-indigo-400'>
                                <NavLink to='#' className="flex w-full px-4 py-2">Settings</NavLink>
                            </li>
                            <li className='hover:text-indigo-400'>
                                <button onClick={logout} className="flex w-full px-4 pt-2 pb-4">Log Out</button>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navigation