import { NavLink } from "react-router-dom"

const CustomButton = (props) => {
    const { children, redirect } = props

    return (
        <NavLink to={redirect} className='rounded-xl'>
            <button className="px-8 py-2 bg-sky-400 rounded-xl text-neutral-100 text-lg hover:bg-sky-500">
                {children}
            </button>
        </NavLink>
    )
}

export default CustomButton