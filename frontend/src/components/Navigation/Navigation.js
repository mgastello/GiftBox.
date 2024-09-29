// import { useSelector } from 'react-redux'

import { NavLink } from "react-router-dom"

const Navigation = () => {
    // const sessionUser = useSelector(state => state.session.user)

    return (
        <div className='flex items-center bg-white sticky top-0 py-4 px-24'>
            <h1 className="w-1/3 text-3xl">GiftBox.</h1>
            <div className="w-1/3 text-center text-lg">
                <NavLink to='#' className="m-4">Home</NavLink>
                <NavLink to='#' className="m-4">Wishlists</NavLink>
                <NavLink to='#' className="m-4">Friends</NavLink>
            </div>
            <NavLink to='signup' className="w-1/3 text-end">Sign in/Sign up</NavLink>
        </div>
    )
}

export default Navigation