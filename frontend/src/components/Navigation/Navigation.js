import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import * as sessionAction from '../../store/session'
import { loggedInRedirect } from '../../utils/loggedInRedirect'
import present from '../../images/present.png'

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionAction.logout())
    }

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = (e) => {
        const relatedTarget = e.relatedTarget;
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(relatedTarget) &&
            relatedTarget !== document.querySelector('.account-button')
        ) {
            setIsOpen(false);
        }
    }

    return (
        <div className='flex items-center bg-white sticky top-0 py-4 px-24'>
            <div className='w-1/3'>
                <NavLink to='/' className='flex w-fit'>
                    <img src={present} alt='present' className='w-10' />
                    <h1 className='text-3xl'>
                        GiftBox.
                    </h1>
                </NavLink>
            </div>
            <div className="w-1/3 text-center text-lg">
                <NavLink to={loggedInRedirect('', sessionUser)} className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Home</NavLink>
                <NavLink to={loggedInRedirect('wishlists', sessionUser)} className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Wishlists</NavLink>
                <NavLink to={loggedInRedirect('friends', sessionUser)} className="m-4 hover:text-indigo-400 hover:underline hover:underline-offset-8">Friends</NavLink>
            </div>
            {!sessionUser ? (
                <div className='flex justify-end w-1/3'>
                    <NavLink to='signup' className="text-lg hover:text-indigo-400 hover:underline hover:underline-offset-8">Sign in / Sign up</NavLink>
                </div>
            ) : (
                <div className="w-1/3 flex justify-end">
                    <h3 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='text-lg hover:text-indigo-400 hover:underline hover:underline-offset-8 account-button'>
                        Account <i class="fa-regular fa-user"></i>
                    </h3>
                    {isOpen && (
                        <ul ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='absolute right-[88px] top-12 bg-slate-50 rounded-md text-md text-black min-w-32'>
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