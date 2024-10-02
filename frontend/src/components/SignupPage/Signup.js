import { useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import present from '../../images/present.png'

const Signup = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const emailError = errors.find(error => error.includes("Email"))
    const fNameError = errors.find(error => error.includes("First"))
    const lNameError = errors.find(error => error.includes("Last"))
    const passwordError = errors.find(error => error.includes("Password"))

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    return (
        <div>
            <NavLink to='/' className='flex mx-24 my-4 w-fit'>
                <img src={present} alt='present' className='w-10' />
                <h1 className='text-3xl'>
                    GiftBox.
                </h1>
            </NavLink>
            <div className='flex flex-col items-center p-6'>
                <h1 className='text-2xl mb-2'>Welcome to GiftBox.</h1>
                <h3 className='text-xl mb-4'>Making gift giving fun and simple.</h3>
                <h3 className='text-xl'>Get started by making a free account today.</h3>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input
                    type='text'
                    value={firstName}
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`p-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${fNameError ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                {fNameError ? (<h1 className='mt-1 text-red-500'>Please enter your first name.</h1>) : (null) }
                <input
                    type='text'
                    value={lastName}
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                    className={`p-3 mt-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${lNameError ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                {lNameError ? (<h1 className='mt-1 text-red-500'>Please enter your last name.</h1>) : (null) }
                <input
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    className={`p-3 mt-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${emailError ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                {emailError?.includes("taken") ? (
                    <h1 className='mt-1 text-red-500'>An account with this email already exists. <NavLink to='/login' className='text-blue-500 hover:text-blue-600 underline'>Login!</NavLink></h1>
                ) : (
                    <h1 className='mt-1 text-red-500'>{emailError}</h1>
                )}
                <input
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className={`p-3 mt-3 text-md min-w-96 border-2 border-black rounded-md outline-none ${passwordError ? 'bg-amber-300 placeholder:text-red-500' : ''}`}
                />
                <h1 className='mt-1 text-red-500'>{passwordError}.</h1>
                <NavLink to='/login' className='m-4 underline hover:text-blue-600'>Already have an account? Login!</NavLink>
                <button type='submit' className="px-8 py-2 bg-sky-400 rounded-xl text-neutral-100 text-lg hover:bg-sky-500">Create Account</button>
            </form>
        </div>
    )
}

export default Signup;